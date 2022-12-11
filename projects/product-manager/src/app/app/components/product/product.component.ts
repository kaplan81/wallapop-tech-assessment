import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule],
  standalone: true,
  styleUrls: ['./product.component.scss'],
  selector: 'mng-product',
  templateUrl: './product.component.html',
})
export class ProductComponent {}
