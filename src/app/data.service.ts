import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface GithubApi {
  items: GitHubUsers[];
  total_count: number;
}
export interface GithubUserDetails {
  name: string;
  company: string;
  bio: string;
  public_repos: string;
  public_gists: string;
  followers: string;
  following: string;
  twitter_username: string;
  location: string;
}
// export interface GithubIssue {
//   created_at: string;
//   number: string;
//   state: string;
//   title: string;
// }

export interface GitHubUsers {
  login: string;
  avatar: string;
  type: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getUsers(sort: string, order: string, page: number): Observable<GithubApi> {
    console.log('repoIssues', sort, order, page);

    // const href = 'https://api.github.com/search/issues';
    // const requestUrl = `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${
    //   page + 1
    // }`;

    const href = 'https://api.github.com/search/users';
    const requestUrl = `${href}?q=users&sort=${sort}&order=${order}&page=${
      page + 1
    }`;

    return this.http.get<GithubApi>(requestUrl);
  }

  getUser(login: string) {
    console.log({ login });

    const href = 'https://api.github.com/users';
    const requestUrl = `${href}/${login}`;

    return this.http.get<GithubUserDetails>(requestUrl);
  }
}
