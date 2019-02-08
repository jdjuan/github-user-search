import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { DetailedUser } from './models/user.model';
import { UsersSearch } from './models/users-search.model';

@Injectable({
  providedIn: 'root',
})
export class UserSearchService {
  searchUrl = 'https://api.github.com/search/users';

  constructor(private httpClient: HttpClient) {}

  search(searchTerm: string): Observable<DetailedUser[] | Error> {
    const queryUrl = `${this.searchUrl}?q=${searchTerm}`;
    return this.httpClient.get<UsersSearch>(queryUrl).pipe(
      switchMap((users: UsersSearch) => {
        if (users.items.length) {
          return forkJoin(
            users.items.map((user) => {
              return this.httpClient
                .get<DetailedUser>(user.url)
                .pipe(catchError(this.errorHandler));
            }),
          );
        } else {
          return of([]);
        }
      }),
      catchError(this.queryErrorHandler),
    );
  }

  errorHandler = (error: Error) => {
    console.error(error);
    return of(error);
  }

  queryErrorHandler = (error: Error) => {
    alert('Ooops! Something went wrong 😢, blame @jdjuan');
    console.error(error);
    return of(error);
  }
}
