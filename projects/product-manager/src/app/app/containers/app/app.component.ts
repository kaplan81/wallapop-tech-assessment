import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterEvent, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { SearchComponent } from '../../components/search/search.component';

@Component({
  imports: [RouterModule, MatToolbarModule, MatButtonModule, MatInputModule, SearchComponent, NgIf],
  selector: 'mng-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isRootRoute = true;
  #router = inject(Router);

  constructor() {
    this.#router.events
      /**
       * We cannot type the event to RouterEvent because an issue wiht Angular:
       * https://github.com/angular/angular/issues/43124
       */
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => (this.isRootRoute = (event as RouterEvent).url === '/'));
  }
}
