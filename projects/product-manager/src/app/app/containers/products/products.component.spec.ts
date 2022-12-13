import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgZone } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { switchMap, tap } from 'rxjs';
import { SortET } from '../../enums/sort.enum';
import { ShallowComponentSuite } from '../../models/component-suite.model';
import { ProductItemState } from '../../models/products-state.model';
import { ProductsStateService } from '../../services/products-state/products-state.service';
import { ComponentSuite } from '../../test/component-suite';
import { productItemsStateMock } from '../../test/mocks/products-state.mock';
import { ensureAngularZone } from '../../utils/ng.util';
import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let fixture: ComponentFixture<ProductsComponent>;
  let els: ShallowComponentSuite<ProductsComponent>;
  let productsStateService: ProductsStateService;
  let ngZone: NgZone;
  let route: ActivatedRoute;
  let router: Router;
  let routerNavigateSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductsComponent,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'products',
            redirectTo: '',
          },
        ]),
        NoopAnimationsModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ProductsComponent);
    els = new ComponentSuite(fixture).elements;
    productsStateService = TestBed.inject(ProductsStateService);
    ngZone = TestBed.inject(NgZone);
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    routerNavigateSpy = jest.spyOn(router, 'navigate');
  });

  it('should match snapshot', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should load entities', () => {
    fixture.detectChanges();
    ensureAngularZone(ngZone, () => {
      router.navigate(['products'], { queryParams: { page: 1 } });
      expect(routerNavigateSpy).toHaveBeenCalledWith(['products'], {
        queryParams: { page: 1 },
      });
    });
    expect(productsStateService.state.entities.length).toBe(0);
    productsStateService.updateState({
      ...productsStateService.state,
      entities: productItemsStateMock,
    });
    expect(productsStateService.state.entities.length).toBe(20);
  });

  // Page base is 1 in test.
  it('should be able to navigate to the next page', () => {
    ensureAngularZone(ngZone, () => {
      els.host.component.goToNextPage();
      expect(routerNavigateSpy).toHaveBeenCalledWith([], {
        queryParams: { page: 2 },
      });
    });
  });

  // Page base is 1 in test.
  it('should be able to navigate to the prev page', () => {
    ensureAngularZone(ngZone, () => {
      els.host.component.goToPrevPage();
      expect(routerNavigateSpy).toHaveBeenCalledWith([], {
        queryParams: { page: 0 },
      });
    });
  });

  it('should be able to sort products', () => {
    productsStateService.updateState({
      ...productsStateService.state,
      entities: productItemsStateMock,
    });
    ensureAngularZone(ngZone, () => {
      els.host.component.onSortSelected('email');
      expect(routerNavigateSpy).toHaveBeenCalledWith([], {
        queryParams: { page: 1 },
      });
      els.host.component.sort$
        .pipe(
          switchMap((sort: SortET) =>
            els.host.component.products$.pipe(
              tap((products: ProductItemState[]) => {
                if (sort === 'title') {
                  expect(products[0].email).toBe('barbecue@wallapop.com');
                }
                if (sort === 'email') {
                  expect(products[0].email).toBe('analogue@wallapop.com');
                }
              }),
            ),
          ),
        )
        .subscribe();
    });
  });
});
