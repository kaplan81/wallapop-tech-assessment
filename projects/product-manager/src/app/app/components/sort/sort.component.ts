import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Sort } from '../../enums/sort.enum';
import { getEnumKeys } from '../../utils/ts.util';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatSelectModule, MatInputModule, NgFor],
  selector: 'mng-sort',
  standalone: true,
  styleUrls: ['./sort.component.scss'],
  templateUrl: './sort.component.html',
})
export class SortComponent {
  #fb = inject(NonNullableFormBuilder);
  sortForm = this.#fb.group({
    sortCriteria: [Sort[Sort.title], Validators.required],
  });
  sortOptions: string[] = getEnumKeys(Sort);
}
