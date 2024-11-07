import { Component, inject, Input, signal, SimpleChange, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { RouterLinkWithHref, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  ocultarSideMenu = signal(true);
  //@Input({required: true}) cart: Product[] = [];
  //total = signal(0);
  private cartService = inject(CartService);
  cart = this.cartService.cart;
  total = this.cartService.total;

  toogleSideMenu(){
    this.ocultarSideMenu.update(prevState => !prevState)
  }

  // ngOnChanges(changes: SimpleChanges){
  //   const cart = changes['cart']; //Valida si algo ha cambiado en la variable cart
  //   if(cart){
  //     this.total.set(this.calcularTotal());
  //   }
  // }

  // calcularTotal(){
  //   return this.cart.reduce((total, product) => total + product.price, 0 )
  // }
}
