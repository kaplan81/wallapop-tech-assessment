import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';

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
  searchForm = this.#fb.group({
    searchCriteria: [''],
  });

  onSubmit(event: SubmitEvent): void {
    console.log('onSubmit', event);
    this.searchForm.reset();
  }
}
