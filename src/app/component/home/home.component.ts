import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  MatBottomSheet,
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import {
  DataService,
  GithubUserDetails,
  GitHubUsers,
} from 'src/app/data.service';
import { MoreComponent } from './more/more.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  displayedColumns: string[] = ['login', 'avatar', 'type', 'url', 'action'];
  // exampleDatabase: ExampleHttpDatabase | null;
  data: GitHubUsers[] = [];
  user: GithubUserDetails;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private _httpClient: HttpClient,
    private dataService: DataService
  ) {}

  ngAfterViewInit() {
    // this.dataService = new ExampleHttpDatabase(this._httpClient);

    // If the user changes the sort order, reset back to the first page.
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
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;

          console.log(data);
          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
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
  // post: any[];
  // count: number;
  // constructor(private dataService: DataService) {}

  // ngOnInit() {
  //   this.dataService.getPosts().subscribe((posts) => {
  //     this.post = posts;
  //     this.dataService.postsData = posts;
  //     this.count = posts.length;
  //   });
  // }

  // onSelectedOption(e) {
  //   this.getFilteredExpenseList();
  // }

  // getFilteredExpenseList() {
  //   if (this.dataService.searchOption.length > 0)
  //     this.post = this.dataService.filteredListOptions();
  //   else {
  //     this.post = this.dataService.postsData;
  //   }

  //   console.log(this.post);
  // }
}
