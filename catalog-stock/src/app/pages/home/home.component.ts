import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [CommonModule, CurrencyPipe, HttpClientModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  products: any[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(
    public cartService: CartService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    this.errorMessage = '';

    this.http.get<any[]>('https://seu-backend.com/products')
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.isLoading = false;
          this.errorMessage = 'Erro ao carregar produtos. Tente novamente.';
          return throwError(() => error);
        })
      )
      .subscribe((data) => {
        this.products = data;
        this.isLoading = false;
      });
  }

  addToCart(product: any) {
    this.cartService.add(product);
  }

  openCart() {
    this.router.navigate(['/cart']);
  }
}
