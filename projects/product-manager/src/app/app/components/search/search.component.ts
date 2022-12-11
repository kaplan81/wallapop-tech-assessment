import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsStateService } from '../../services/products-state/products-state.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  selector: 'mng-search',
  standalone: true,
  styleUrls: ['./search.component.scss'],
  templateUrl: './search.component.html',
})
export class SearchComponent {
  #fb = inject(NonNullableFormBuilder);
  #productsStateService = inject(ProductsStateService);
  #router = inject(Router);
  searchForm = this.#fb.group({
    searchCriteria: [''],
  });

  onSubmit(): void {
    this.#router.navigate(['products'], { queryParams: { page: 1 } }).then(() => {
      this.searchForm.reset();
      this.#productsStateService.updateStateProp('loaded', false);
    });
  }
}
