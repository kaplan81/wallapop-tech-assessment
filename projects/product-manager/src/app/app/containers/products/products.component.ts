import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductComponent } from '../../components/product/product.component';
import { ProductItem } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgFor, AsyncPipe, ProductComponent],
  selector: 'mng-products',
  standalone: true,
  styleUrls: ['./products.component.scss'],
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  #productsService = inject(ProductsService);
  products$: Observable<ProductItem[]> = this.#productsService.getProducts();
}
