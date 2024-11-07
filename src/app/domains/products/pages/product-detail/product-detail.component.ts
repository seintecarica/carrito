import { Component, inject, Input, signal } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { ProductService } from '@shared/services/product.service';
import { CartService } from '@shared/services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  @Input() id?: string;
  product = signal<Product | null>(null);
  portada = signal('');
  private productsService = inject(ProductService);
  private cartService = inject(CartService);

  ngOnInit(){
    if(this.id){
      this.productsService.getProduct(this.id)
                          .subscribe({
                            next: (product) => {
                              //console.log(product);
                              this.product.set(product);
                              if(product.images.length > 0){
                                this.portada.set(product.images[0]);
                              }
                            }
                          });
    }

  }

  changePortada(newImg: string){
    this.portada.set(newImg);
  }

  addToCart(){
    const product = this.product();
    if(product){
      this.cartService.addToCart(product);
    }

  }
}
