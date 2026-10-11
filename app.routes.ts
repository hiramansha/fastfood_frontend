import { Routes } from '@angular/router';
import { Home } from '../pages/home/home';
import { Products } from '../pages/products/products';
import { ProductDetail } from '../pages/product-detail/product-detail';
import { Cart } from '../pages/cart/cart';
import { Checkout } from '../pages/checkout/checkout';
import { Login } from '../pages/login/login';
import { Register } from '../pages/register/register';
import { Orders } from '../pages/orders/orders';

export const routes: Routes = [
     {
    path: '',
    component:Home
  },
  {
    path: 'products',
    component: Products
  },
  {
    path: 'products/:id',
    component: ProductDetail
  },
  {
    path: 'cart',
    component: Cart
  },
  {
    path: 'checkout',
    component: Checkout
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'register',
    component: Register
  },
  {
    path: 'orders',
    component: Orders
  },
  {
    path: '**',
    redirectTo: ''
  }
];
