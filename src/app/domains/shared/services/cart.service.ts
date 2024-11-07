import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = signal<Product[]>([]); //Esta señal es la que va a suscribirse y desplegar los cambios a los componentes que lo necesiten sin input y output
  total = computed(() => {
    const cart = this.cart();
    return cart.reduce((total, product) => total + product.price, 0)
  })
  constructor() { }

  addToCart(product: Product){
    this.cart.update(state => [...state, product]);
  }
}
