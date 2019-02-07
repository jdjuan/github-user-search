import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { UsersSearch } from './users-search.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  searchResults: Observable<any>;
  url = 'https://api.github.com/search/users?q=jdjuan';

  constructor(private httpClient: HttpClient) {
    this.searchResults = this.httpClient
      .get<UsersSearch>(this.url)
      .pipe(
        switchMap((users: UsersSearch) => {
          return forkJoin(
            users.items.map((user) => {
              return this.httpClient
                .get(user.url)
                .pipe(catchError((error: Error) => of(error)));
            }),
          );
        }),
      );

    this.searchResults.subscribe(console.log);
  }
}
