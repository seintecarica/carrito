import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '@shared/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private http = inject(HttpClient); //permite enviar unrequest y obtener y procesar esa información

  constructor() { }

  getCategories(){
    return this.http.get<Category[]>('https://api.escuelajs.co/api/v1/categories');
  }
}
