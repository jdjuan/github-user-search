import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DetailedUser } from '../models/user.model';
import { UserSearchService } from '../user-search.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UserSearchComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['avatar_url', 'login', 'name', 'followers', 'info'];
  dataSource: MatTableDataSource<DetailedUser>;
  loading: boolean;
  expandedElement: DetailedUser | null;

  constructor(private userSearchService: UserSearchService) {
    this.dataSource = new MatTableDataSource();
    this.searchUser('jdjuan');
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  searchUser(searchTerm: string) {
    this.loading = true;
    this.dataSource.data = [];
    this.userSearchService.search(searchTerm).subscribe((data: DetailedUser[]) => {
      this.dataSource.data = data;
      this.loading = false;
    });
  }
}
