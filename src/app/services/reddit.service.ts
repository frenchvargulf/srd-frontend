import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';

import { BehaviorSubject, throwError } from 'rxjs';
import { PostsService } from './posts.service';

@Injectable({ providedIn: 'root' })
export class RedditService {
  apiURL = 'https://www.reddit.com/r/sweden.json';
  count = 0;
  after = '';

  constructor(private http: HttpClient, private postsService: PostsService) { }


  fetchPosts(limit = 25): void {
    this.http
      .get<any>(this.apiURL + `?limit=${limit}` + (this.after ? `&after=${this.after}` : ''))
      .pipe(
        tap(res => {
          this.after = res.data.after;
        }),
        map(res => res.data.children.map((child: any) => child.data)),
        catchError(this.handleError)
      )
      .subscribe(posts => {
        this.postsService.setPosts(posts);
      });
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}