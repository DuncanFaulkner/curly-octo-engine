import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import {
  DataService,
  GithubUserDetails,
  GitHubUsers,
} from 'src/app/data.service';
import { MoreComponent } from './more/more.component';
import { ResultsComponent } from './results/results.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  displayedColumns: string[] = ['login', 'avatar', 'type', 'url', 'action'];
  data: GitHubUsers[] = [];
  user: GithubUserDetails;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private dataService: DataService,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.dataService!.getUsers(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex
          );
        }),
        map((data) => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;
          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      )
      .subscribe((data) => {
        this.data = data;
      });
  }

  more(user: GitHubUsers) {
    this.dataService
      .getUser(user.login)
      .pipe()
      .subscribe((data) => {
        this._bottomSheet.open(MoreComponent, {
          data: { data },
        });
      });
  }

  onSearch(user: string) {
    this.dataService
      .getUserByLogin(user)
      .pipe()
      .subscribe((data) => {
        this.dialog.open(ResultsComponent, {
          width: '600px',
          data: {
            user: data,
          },
        });
      });
  }
}
