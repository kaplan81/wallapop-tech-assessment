import { ProductItem } from './product.model';

export interface ProductsState {
  entities: ProductItem[];
  favourites: ProductItem[];
  loaded: boolean;
  loading: boolean;
}
