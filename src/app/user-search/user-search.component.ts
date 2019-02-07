import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
} from '@angular/material';
import { DetailedUser } from '../models/user.model';
import { UserSearchService } from '../user-search.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss'],
})
export class UserSearchComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'avatar_url',
    'login',
    'company',
    'bio',
  ];
  dataSource: MatTableDataSource<DetailedUser>;
  loading: boolean;

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
    this.userSearchService
      .search(searchTerm)
      .subscribe((data: DetailedUser[]) => {
        this.dataSource.data = data;
        this.loading = false;
      });
  }
}
