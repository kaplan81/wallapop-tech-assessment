import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable, tap } from 'rxjs';
import { ProductItem, ProductSearchData } from '../../models/product.model';
import { ProductsStateService } from '../products-state/products-state.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient, private productsStateService: ProductsStateService) {}

  getProducts(): Observable<ProductItem[]> {
    const url = 'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/items.json';
    return this.http
      .get<ProductSearchData>(url)
      .pipe(map((data: ProductSearchData) => data.items))
      .pipe(
        delay(2000),
        tap((entities: ProductItem[]) =>
          this.productsStateService.updateState({
            ...this.productsStateService.state,
            entities,
            loaded: true,
            loading: false,
          }),
        ),
      );
  }
}
