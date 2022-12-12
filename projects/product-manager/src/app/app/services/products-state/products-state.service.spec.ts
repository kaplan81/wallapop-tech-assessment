import { inject, TestBed } from '@angular/core/testing';
import { ProductsStateService } from './products-state.service';

describe('ProductsStateService', () => {
  let productsStateService: ProductsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsStateService],
    });
    productsStateService = TestBed.inject(ProductsStateService);
  });

  it('can be instantiated via DI', inject(
    [ProductsStateService],
    (injectedService: ProductsStateService) => {
      expect(injectedService).toEqual(productsStateService);
    },
  ));
});
