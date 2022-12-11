import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EMPTY, filter, Observable, shareReplay, Subject, switchMap, takeUntil } from 'rxjs';
import { ProductComponent } from '../../components/product/product.component';
import { ProductItem } from '../../models/product.model';
import { ProductsStateService } from '../../services/products-state/products-state.service';
import { ProductsService } from '../../services/products/products.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgFor, AsyncPipe, ProductComponent, MatProgressSpinnerModule],
  selector: 'mng-products',
  standalone: true,
  styleUrls: ['./products.component.scss'],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit, OnDestroy {
  #destroyed$ = new Subject<void>();
  loading$: Observable<boolean>;
  #productsService = inject(ProductsService);
  #productsStateService = inject(ProductsStateService);
  products$: Observable<ProductItem[]> = this.#productsStateService.getStateProp('entities');

  constructor() {
    this.loading$ = this.#productsStateService
      .getStateProp('loading')
      .pipe(shareReplay({ bufferSize: 1, refCount: true }), takeUntil(this.#destroyed$));
    // Subscribe to loading$ as soon as possible.
    this.loading$.subscribe();
    this.#productsStateService
      .getStateProp('loaded')
      .pipe(
        filter((loaded: boolean) => !loaded),
        takeUntil(this.#destroyed$),
        switchMap((l: boolean) => {
          if (!l && !this.#productsStateService.state.loading) {
            this.#productsStateService.updateStateProp('loading', true);
            return this.#productsService.getProducts();
          }
          return EMPTY;
        }),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.#destroyed$.next();
  }

  ngOnInit(): void {
    this.#productsStateService.updateStateProp('loading', true);
    this.#productsService.getProducts().subscribe();
  }
}
