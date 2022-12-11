import { Injectable } from '@angular/core';
import { StateMixin } from '../../mixins/state.mixin';
import { ProductsState } from '../../models/products-state.model';
import { productsStateInitial } from './products.initial';

@Injectable({
  providedIn: 'root',
})
export class ProductsStateService extends StateMixin<ProductsState>(productsStateInitial) {
  constructor() {
    super();
  }
}
