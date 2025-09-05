import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, data: { animation: 'HomePage' } },
    { path: 'cart', component: CartComponent, data: { animation: 'CartPage' } },
    { path: 'checkout', component: CheckoutComponent, data: { animation: 'CheckoutPage' } }
];
