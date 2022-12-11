import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ProductItemState } from '../../models/products-state.model';
import { ProductsStateService } from '../../services/products-state/products-state.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, MatCardModule, MatIconModule],
  standalone: true,
  styleUrls: ['./product.component.scss'],
  selector: 'mng-product',
  templateUrl: './product.component.html',
})
export class ProductComponent {
  @Input() product: ProductItemState | null = null;
  #productsStateService = inject(ProductsStateService);

  updateFavourites(email: string, isFavourite: boolean): void {
    const newFavourite: boolean = !isFavourite;
    this.#productsStateService.updateFavourites(email, newFavourite);
  }
}
