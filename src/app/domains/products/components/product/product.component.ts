import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '@shared/models/product.model';
import { ReversePipe } from '@shared/pipes/reverse.pipe';
import { TimeAgoPipe } from '@shared/pipes/time-ago.pipe';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ReversePipe, TimeAgoPipe, RouterLinkWithHref],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input({required: true}) product!: Product;

  // @Input({required: true}) img: string = '';
  // @Input({required: true}) price: number = 0;
  // @Input({required: true}) title: string = '';

  @Output() addToCart = new EventEmitter(); //La forma de declarar un output

  addToCartHandler(){
    this.addToCart.emit(this.product);
  }

  //img = 'https://picsum.photos/640/640?r=' + Math.random()
}
