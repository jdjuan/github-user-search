import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DetailedUser } from '../models/user.model';
import { UserSearchService } from '../services/user-search.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('425ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UserSearchComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['avatar_url', 'login', 'name', 'followers', 'info'];
  dataSource: MatTableDataSource<DetailedUser>;
  expandedElement: DetailedUser | null;
  totalUsersFound: number;
  loading: boolean;

  constructor(private userSearchService: UserSearchService) {
    this.dataSource = new MatTableDataSource();
    this.searchUser('Juan Herrera');
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  searchUser(searchTerm: string) {
    if (searchTerm) {
      this.loading = true;
      this.dataSource.data = [];
      this.userSearchService.search(searchTerm).subscribe(
        (data: DetailedUser[]) => {
          this.totalUsersFound = data.length;
          this.dataSource.data = data;
          this.loading = false;
        },
        (error) => {
          console.log(error);
          this.totalUsersFound = 0;
          this.loading = true;
        },
      );
    }
  }
}
