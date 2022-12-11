import { NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  Output,
} from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Subject, takeUntil } from 'rxjs';
import { Sort, SortET } from '../../enums/sort.enum';
import { getEnumKeys } from '../../utils/ts.util';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatSelectModule, MatInputModule, NgFor],
  selector: 'mng-sort',
  standalone: true,
  styleUrls: ['./sort.component.scss'],
  templateUrl: './sort.component.html',
})
export class SortComponent implements OnDestroy {
  @Output() sortSelected = new EventEmitter<SortET>();
  #destroyed$ = new Subject<void>();
  #fb = inject(NonNullableFormBuilder);
  sortForm = this.#fb.group({
    sortCriteria: [Sort[Sort.title], Validators.required],
  });
  sortOptions: string[] = getEnumKeys(Sort);

  constructor() {
    this.sortForm.valueChanges.pipe(takeUntil(this.#destroyed$)).subscribe(
      (
        change: Partial<{
          sortCriteria: string;
        }>,
      ) => {
        this.sortSelected.emit(change.sortCriteria as SortET);
      },
    );
  }

  ngOnDestroy(): void {
    this.#destroyed$.next();
  }
}
