import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './favourites-dialog.component.html',
  selector: 'mng-favourites-dialog',
  standalone: true,
  styleUrls: ['./favourites-dialog.component.scss'],
})
export class FavouritesDialogComponent {}
