import { ProductItem } from './product.model';

export interface ProductsState {
  entities: ProductItemState[];
  favourites: string[];
  loaded: boolean;
  loading: boolean;
}

export interface ProductItemState extends ProductItem {
  isFavourite: boolean;
}
