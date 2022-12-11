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

  updateFavourites(email: string, newFavourite: boolean): void {
    const entities: ProductItemState[] = this.state.entities.map((entity: ProductItemState) => ({
      ...entity,
      isFavourite: entity.email === email ? newFavourite : entity.isFavourite,
    }));
    let favourites: string[] = [];
    if (newFavourite) {
      favourites = [...this.state.favourites, email];
    } else {
      favourites = this.state.favourites.filter((favourite: string) => favourite !== email);
    }
    this.updateState({
      ...this.state,
      entities,
      favourites,
    });
  }
}
