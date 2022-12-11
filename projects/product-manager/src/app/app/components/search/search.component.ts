import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  searchForm = this.#fb.group({
    searchCriteria: [''],
  });

  onSubmit(): void {
    let queryParams: Params = this.#route.snapshot.queryParams;
    if (queryParams['page'] === undefined) {
      queryParams = {
        page: 1,
      };
    }
    this.#router.navigate(['products'], { queryParams }).then(() => {
      this.searchForm.reset();
      this.#productsStateService.updateStateProp('loaded', false);
    });
  }
}
