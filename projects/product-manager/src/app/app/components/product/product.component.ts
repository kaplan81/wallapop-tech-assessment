import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ProductItem } from '../../models/product.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, MatCardModule],
  standalone: true,
  styleUrls: ['./product.component.scss'],
  selector: 'mng-product',
  templateUrl: './product.component.html',
})
export class ProductComponent {
  @Input() product: ProductItem | null = null;
}
