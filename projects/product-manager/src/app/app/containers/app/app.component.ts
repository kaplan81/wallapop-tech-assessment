import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterEvent, RouterModule } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { SearchComponent } from '../../components/search/search.component';
import { ProductsStateService } from '../../services/products-state/products-state.service';

@Component({
  imports: [
    RouterModule,
    MatToolbarModule,
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
export class AppComponent implements OnInit {
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

  ngOnInit(): void {
    // this.#favourites$.subscribe((favourites: string[]) => {
    //   console.log('favourites:::', favourites);
    //   const entities: ProductItemState[] = this.#productsStateService.state.entities.map(
    //     (entity: ProductItemState) => ({
    //       ...entity,
    //       isFavourite:
    //         favourites.find((favourite: string) => favourite === entity.email) !== undefined,
    //     }),
    //   );
    //   console.log(entities);
    //   this.#productsStateService.updateStateProp('entities', entities);
    // });
  }
}
