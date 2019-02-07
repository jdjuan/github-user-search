import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSearchService } from './user-search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  searchResults: Observable<any>;

  constructor(private userSearch: UserSearchService) {
    this.searchResults = this.userSearch.search('jdjuan');
  }
}
