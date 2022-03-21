import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { PostsService } from './posts.service';
import { RedditPost } from '../RedditPost';

type ListingPost = {
  data: RedditPost;
  kind: string;
}

@Injectable({ providedIn: 'root' })
export class RedditService {
  isFetchingPosts$ = new BehaviorSubject(false);
  apiURL = 'https://www.reddit.com/r/sweden.json';
  count = 0;
  after = '';

  constructor(private http: HttpClient, private postsService: PostsService) { }

  public getIsFetchingPosts(): boolean {
    return this.isFetchingPosts$.value;
  }

  public fetchPosts(limit = 25): void {
    this.isFetchingPosts$.next(true);
    this.http
      .get<any>(this.apiURL + `?limit=${limit}` + (this.after ? `&after=${this.after}` : ''))
      .pipe(
        tap(res => {
          this.after = res.data.after;
        }),
        map(res => res.data.children.map((child: ListingPost) => child.data)),
        catchError(this.handleError)
      )
      .subscribe(posts => {
        this.isFetchingPosts$.next(false);
        this.postsService.setPosts(posts);
      });
  }

  private handleError(error: ErrorEvent | HttpErrorResponse): Observable<ErrorEvent | HttpErrorResponse> {
    let errorMessage = '';
    this.isFetchingPosts$.next(false);
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else if (error instanceof HttpErrorResponse) {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

  public clearAfter() {
    this.after = '';
  }
}
