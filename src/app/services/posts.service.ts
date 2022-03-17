import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError, map, count, tap, BehaviorSubject, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RedditPost } from '../RedditPost';

@Injectable()
export class PostsService {
  postsChanged = new Subject<RedditPost[]>();
  private posts: RedditPost[] = [];

  constructor() { }

  setPosts(posts: RedditPost[]) {
    this.posts = this.posts.concat(posts);
    this.postsChanged.next(this.posts);
  }

  getSlicedPosts(start: number, end: number) {
    return this.posts.slice(start, end);
  }

  clearPosts() {
    this.posts = [];
    this.postsChanged.next(this.posts);
  }

  getPosts() {
    return this.posts.slice();
  }

  getPost(index: number) {
    return this.posts[index];
  }

}
