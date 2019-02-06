import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  searchResult: Observable<any>;
  url = 'https://api.github.com/search/users?q=jdjuan';

  constructor(private httpClient: HttpClient) {
    this.searchResult = this.httpClient.get(this.url);
  }
}
