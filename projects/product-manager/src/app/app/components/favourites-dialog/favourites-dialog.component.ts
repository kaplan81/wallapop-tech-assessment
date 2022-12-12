import { ScrollingModule } from '@angular/cdk/scrolling';
import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { ProductItemState } from '../../models/products-state.model';
import { ProductsStateService } from '../../services/products-state/products-state.service';
import { ProductComponent } from '../product/product.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatDialogModule, MatButtonModule, NgFor, AsyncPipe, ProductComponent, ScrollingModule],
  templateUrl: './favourites-dialog.component.html',
  selector: 'mng-favourites-dialog',
  standalone: true,
  styleUrls: ['./favourites-dialog.component.scss'],
})
export class FavouritesDialogComponent {
  dialogRef: MatDialogRef<FavouritesDialogComponent> = inject(MatDialogRef);
  favouriteEntities$: Observable<ProductItemState[]>;
  #productsStateService = inject(ProductsStateService);

  constructor() {
    this.favouriteEntities$ = this.#productsStateService
      .getStateProp('entities')
      .pipe(map((entities) => entities.filter((entity: ProductItemState) => entity.isFavourite)));
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
