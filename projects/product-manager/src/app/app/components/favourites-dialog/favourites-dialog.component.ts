import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './favourites-dialog.component.html',
  selector: 'mng-favourites-dialog',
  standalone: true,
  styleUrls: ['./favourites-dialog.component.scss'],
})
export class FavouritesDialogComponent {}
