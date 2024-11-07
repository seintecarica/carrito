import { Routes } from '@angular/router';

import { LayoutComponent } from '@shared/components/layout/layout.component';
import { ListComponent } from './domains/products/pages/list/list.component';
import { ProductDetailComponent } from '@products/pages/product-detail/product-detail.component';
import { AboutComponent } from './domains/info/pages/about/about.component';
import { NotFoundComponent } from './domains/info/pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        //component: ListComponent
        loadComponent: () => import('./domains/products/pages/list/list.component').then(m =>m.ListComponent)
      },
      {
        path: 'about',
        //component: AboutComponent
        loadComponent: () => import('./domains/info/pages/about/about.component').then(m =>m.AboutComponent)
      },
      {
        path: 'product/:id',
        //component: ProductDetailComponent
        loadComponent: () => import('@products/pages/product-detail/product-detail.component').then(m =>m.ProductDetailComponent)
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
