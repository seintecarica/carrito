import { Component, signal, inject, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { ProductComponent } from '@products/components/product/product.component'
import { Product } from '@shared/models/product.model'
import { HeaderComponent } from '@shared/components/header/header.component'
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { Category } from '@shared/models/category.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent, HeaderComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  //cart = signal<Product[]>([]); //Se guardaran los productos que el usuario seleccione
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  @Input() category_id?: string;

  //constructor(){
    //const initPRoducts: Product[] = [
      // {
      //   id: Date.now(),
      //   title: 'Product 1',
      //   price: 100,
      //   image: 'https://picsum.photos/640/640?r23',
      //   created_at: new Date().toISOString()
      // },
      // {
      //   id: Date.now(),
      //   title: 'Product 2',
      //   price: 200,
      //   image: 'https://picsum.photos/640/640?r24',
      //   created_at: new Date().toISOString()
      // },
      // {
      //   id: Date.now(),
      //   title: 'Product 3',
      //   price: 250,
      //   image: 'https://picsum.photos/640/640?r25',
      //   created_at: new Date().toISOString()
      // },
      // {
      //   id: Date.now(),
      //   title: 'Product 4',
      //   price: 100,
      //   image: 'https://picsum.photos/640/640?r26',
      //   created_at: new Date().toISOString()
      // },
      // {
      //   id: Date.now(),
      //   title: 'Product 5',
      //   price: 200,
      //   image: 'https://picsum.photos/640/640?r27',
      //   created_at: new Date().toISOString()
      // },
      // {
      //   id: Date.now(),
      //   title: 'Product 6',
      //   price: 250,
      //   image: 'https://picsum.photos/640/640?r29',
      //   created_at: new Date().toISOString()
      // }
    //];
    //this.products.set(initPRoducts);
  //}

  ngOnInit(){
    //this.getProducts();
    this.getCategories();
  }

  ngOnChanges(changes: SimpleChanges){
    // const category_id = changes['category_id'];
    // if(category_id){
      this.getProducts();
    // }
    //console.log(this.category_id);
  }

  addToCart(product: Product){
    // console.log('estamos en el padre');
    // console.log(event);
    //this.cart.update(prevState => [...prevState, product]);
    this.cartService.addToCart(product);
  }

  private getProducts(){
    this.productService.getProducts(this.category_id)
                        .subscribe({
                          next: (data) => {
                            this.products.set(data);
                          },
                          error: () => {
                          }
                        });
  }

  private getCategories(){
    this.categoryService.getCategories()
                        .subscribe({
                          next: (data) => {
                            this.categories.set(data);
                          },
                          error: () => {

                          }
                        });
  }
}
