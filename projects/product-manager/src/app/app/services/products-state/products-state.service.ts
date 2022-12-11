import { Injectable } from '@angular/core';
import { StateMixin } from '../../mixins/state.mixin';
import { ProductItemState, ProductsState } from '../../models/products-state.model';
import { productsStateInitial } from './products.initial';

@Injectable({
  providedIn: 'root',
})
export class ProductsStateService extends StateMixin<ProductsState>(productsStateInitial) {
  constructor() {
    super();
  }

  addTofavourites(email: string): void {
    const favourites: string[] = this.state.favourites;
    const hasFavourite: boolean =
      favourites.find((favourite: string) => favourite === email) !== undefined;
    if (!hasFavourite) {
      const entities: ProductItemState[] = this.state.entities.map((entity: ProductItemState) => ({
        ...entity,
        isFavourite: entity.email === email ? true : entity.isFavourite,
      }));
      this.updateState({
        ...this.state,
        entities,
        favourites: [...favourites, email],
      });
    }
  }
}
