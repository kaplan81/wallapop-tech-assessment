import { Routes } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
import { ProductsComponent } from './containers/products/products.component';

export const routes: Routes = [
  {
    component: HomeComponent,
    path: '',
  },
  {
    component: ProductsComponent,
    path: 'products',
  },
];
