import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, NEVER, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { DetailedUser } from './models/user.model';
import { UsersSearch } from './models/users-search.model';

@Injectable({
  providedIn: 'root',
})
export class UserSearchService {
  searchUrl = 'https://api.github.com/search/users';
  totalCount: number;

  constructor(private httpClient: HttpClient) {}

  search(searchTerm: string): Observable<DetailedUser[]> {
    const queryUrl = `${this.searchUrl}?q=${searchTerm}`;
    return this.httpClient.get<UsersSearch>(queryUrl).pipe(
      switchMap((users: UsersSearch) => {
        this.totalCount = users.total_count;
        return forkJoin(
          users.items.map((user) => {
            return this.httpClient
              .get<DetailedUser>(user.url)
              .pipe(catchError(this.errorHandler));
          }),
        );
      }),
    );
  }

  errorHandler = (error: Error) => {
    console.error(error);
    return NEVER;
  };
}
