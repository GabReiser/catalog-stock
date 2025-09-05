import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CartService } from '../../services/cart.service';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class CheckoutComponent {
  customer = { name: '', phone: '', address: '' };
  isLoading = false;
  errorMessage = '';

  constructor(private cartService: CartService, private http: HttpClient) {}

  submitOrder() {
    const items = this.cartService.getItems();
    if (!items.length) return alert('Carrinho vazio!');

    const order = {
      customer: this.customer,
      items,
    };

    this.isLoading = true;      // ✅ ativa o spinner
    this.errorMessage = '';

    this.http.post<{ success: boolean }>('https://seu-backend.com/orders', order)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.isLoading = false; // ✅ desativa o spinner no erro
          this.errorMessage = 'Erro ao enviar pedido. Tente novamente.';
          return throwError(() => error);
        })
      )
      .subscribe(res => {
        this.isLoading = false; // ✅ desativa o spinner no sucesso

        if (res && res.success) {
          // Monta mensagem pro WhatsApp
          let message = 'Olá! Gostaria de pedir:\n';
          items.forEach((item, i) => {
            message += `${i + 1}. ${item.name} - R$ ${item.price}\n`;
          });
          message += `\nNome: ${this.customer.name}\nTelefone: ${this.customer.phone}\nEndereço: ${this.customer.address}`;

          const phone = '5547991574384';
          const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
          window.open(url, '_blank');

          this.cartService.clearCart();
        } else {
          this.errorMessage = 'Não foi possível processar seu pedido. Tente novamente.';
        }
      });
  }
}
