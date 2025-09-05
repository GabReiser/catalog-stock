import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: any[] = [];

  add(product: any) {
    this.items.push(product);
  }

  remove(index: number) {
    this.items.splice(index, 1);
  }

  clear() {
    this.items = [];
  }

  getItems() {
    return this.items;
  }

  getCartCount(): number {
    return this.items.length;
  }

    getTotal(): number {
    return this.items.reduce((acc, item) => acc + item.price, 0);
  }
    clearCart() {
    this.items = []; // Limpa o carrinho
  }
}
