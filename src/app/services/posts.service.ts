import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RedditPost } from '../RedditPost';

@Injectable()
export class DataService {
  apiURL = 'https://www.reddit.com/r/sweden.json';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getPosts(): Observable<RedditPost[]> {
    return this.http
      .get<any>(this.apiURL)
      .pipe(retry(1),
        map(res => res.data.children.map((child: any) => child.data)),
        catchError(this.handleError)
      );
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
