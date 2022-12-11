export interface ProductSearchData {
  items: ProductItem[];
}

export interface ProductItem {
  title: string;
  description: string;
  price: string;
  email: string;
  image: string;
}
