import { AsyncPipe, NgFor, NgIf, ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
import { take } from 'rxjs/operators';
import { ProductComponent } from '../../components/product/product.component';
import { SearchComponent } from '../../components/search/search.component';
import { SortComponent } from '../../components/sort/sort.component';
import { Sort, SortET } from '../../enums/sort.enum';
import { ProductItemState } from '../../models/products-state.model';
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
  #page$: Observable<number>;
  #productsService = inject(ProductsService);
  #productsStateService = inject(ProductsStateService);
  products$: Observable<ProductItemState[]>;
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  sort$ = new BehaviorSubject<SortET>(Sort[Sort.title] as SortET);
  #viewPortScroller = inject(ViewportScroller);

  constructor() {
    this.#page$ = this.#route.queryParams.pipe(
      map((params: Params) => (params['page'] !== undefined ? +params['page'] : 1)),
      shareReplay({ bufferSize: 1, refCount: true }),
    );
    this.isNextDisabled$ = this.#page$.pipe(map((page: number) => page + 1 > this.#maxPage));
    this.isPrevDisabled$ = this.#page$.pipe(map((page: number) => page === 1));
    this.loading$ = this.#productsStateService
      .getStateProp('loading')
      .pipe(shareReplay({ bufferSize: 1, refCount: true }), takeUntil(this.#destroyed$));
    this.products$ = combineLatest([this.sort$, this.#page$]).pipe(
      switchMap(([sort, page]: [SortET, number]) =>
        this.#productsStateService.getStateProp('entities').pipe(
          map((products: ProductItemState[]) => this.parseProducts(products, page, sort)),
          takeUntil(this.#destroyed$),
        ),
      ),
    );
  }

  goToNextPage(): void {
    this.#page$.pipe(take(1)).subscribe((page: number) => this.navigateToPage(page + 1));
  }

  goToPrevPage(): void {
    this.#page$.pipe(take(1)).subscribe((page: number) => this.navigateToPage(page - 1));
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
    this.navigateToPage(1, () => this.sort$.next(event));
  }

  trackByProducts(index: number, product: ProductItemState) {
    return product.email;
  }

  private navigateToPage(page: number, callback?: () => void): void {
    this.#router.navigate([], { queryParams: { page } }).then(() => {
      this.#viewPortScroller.scrollToPosition([0, 0]);
      if (callback !== undefined) {
        callback();
      }
    });
  }

  private parseProducts(
    products: ProductItemState[],
    page: number,
    sort: SortET,
  ): ProductItemState[] {
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
