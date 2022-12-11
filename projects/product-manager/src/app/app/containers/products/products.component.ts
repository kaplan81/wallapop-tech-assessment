import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Params } from '@angular/router';
import {
  BehaviorSubject,
  combineLatest,
  EMPTY,
  filter,
  map,
  Observable,
  shareReplay,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { ProductComponent } from '../../components/product/product.component';
import { SearchComponent } from '../../components/search/search.component';
import { SortComponent } from '../../components/sort/sort.component';
import { Sort, SortET } from '../../enums/sort.enum';
import { ProductItem } from '../../models/product.model';
import { ProductsStateService } from '../../services/products-state/products-state.service';
import { ProductsService } from '../../services/products/products.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    ProductComponent,
    MatProgressSpinnerModule,
    MatButtonModule,
    SearchComponent,
    SortComponent,
  ],
  selector: 'mng-products',
  standalone: true,
  styleUrls: ['./products.component.scss'],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit, OnDestroy {
  static readonly perPage = 5;
  #destroyed$ = new Subject<void>();
  isNextDisabled$: Observable<boolean>;
  isPrevDisabled$: Observable<boolean>;
  loading$: Observable<boolean>;
  #maxPage = 1;
  page$: Observable<number>;
  #productsService = inject(ProductsService);
  #productsStateService = inject(ProductsStateService);
  products$: Observable<ProductItem[]>;
  #route = inject(ActivatedRoute);
  sort$ = new BehaviorSubject<SortET>(Sort[Sort.title] as SortET);

  constructor() {
    this.page$ = this.#route.queryParams.pipe(map((params: Params) => +params['page'] ?? 1));
    this.isNextDisabled$ = this.page$.pipe(map((page: number) => page + 1 > this.#maxPage));
    this.isPrevDisabled$ = this.page$.pipe(map((page: number) => page === 1));
    this.loading$ = this.#productsStateService
      .getStateProp('loading')
      .pipe(shareReplay({ bufferSize: 1, refCount: true }), takeUntil(this.#destroyed$));
    this.products$ = combineLatest([this.sort$, this.page$]).pipe(
      switchMap(([sort, page]: [SortET, number]) =>
        this.#productsStateService
          .getStateProp('entities')
          .pipe(map((products: ProductItem[]) => this.parseProducts(products, page, sort))),
      ),
    );
  }

  ngOnDestroy(): void {
    this.#destroyed$.next();
  }

  ngOnInit(): void {
    this.loading$.subscribe();
    this.#productsStateService.updateStateProp('loading', true);
    this.#productsService.getProducts().subscribe();
    this.refreshOnNotLoaded();
  }

  onSortSelected(event: SortET): void {
    this.sort$.next(event);
  }

  private parseProducts(products: ProductItem[], page: number, sort: SortET): ProductItem[] {
    const sliceStart: number = ProductsComponent.perPage * (page - 1);
    let sliceEnd: number = sliceStart + ProductsComponent.perPage;
    if (products.length > 0) {
      this.#maxPage = Math.ceil(products.length / ProductsComponent.perPage);
    }
    if (sliceEnd > products.length) {
      sliceEnd = products.length;
    }
    return products.sort((a, b) => (a[sort] < b[sort] ? -1 : 1)).slice(sliceStart, sliceEnd);
  }

  private refreshOnNotLoaded(): void {
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
}
