import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterEvent, RouterModule } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { FavouritesDialogComponent } from '../../components/favourites-dialog/favourites-dialog.component';
import { SearchComponent } from '../../components/search/search.component';
import { ProductsStateService } from '../../services/products-state/products-state.service';

@Component({
  imports: [
    RouterModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    SearchComponent,
    NgIf,
    AsyncPipe,
  ],
  selector: 'mng-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  #dialog = inject(MatDialog);
  #favourites$: Observable<string[]>;
  isFavouritesDisabled$: Observable<boolean>;
  isRootRoute = true;
  #productsStateService = inject(ProductsStateService);
  #router = inject(Router);

  constructor() {
    this.#router.events
      /**
       * We cannot type the event to RouterEvent because an issue wiht Angular:
       * https://github.com/angular/angular/issues/43124
       */
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => (this.isRootRoute = (event as RouterEvent).url === '/'));
    this.#favourites$ = this.#productsStateService.getStateProp('favourites');
    this.isFavouritesDisabled$ = this.#favourites$.pipe(
      map((items: string[]) => items.length === 0),
    );
  }

  openDialog(): void {
    const dialogRef = this.#dialog.open(FavouritesDialogComponent, {
      // disableClose: true,
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '100ms',
      height: '80vh',
      width: '90vh',
    });
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((data: any | undefined) => {});
  }
}
