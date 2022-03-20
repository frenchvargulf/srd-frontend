import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { RedditPost } from '../RedditPost';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RedditService } from '../services/reddit.service';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'srd-reddit-feed',
  templateUrl: './reddit-feed.component.html',
  styleUrls: ['./reddit-feed.component.scss']
})
export class RedditFeedComponent implements OnInit, OnDestroy {
  pageSize = 25;
  currentPage = 0;
  pageSizeOptions = [5, 10, 25];
  posts: RedditPost[] = [];
  private destroyed$ = new Subject();
  private postsSubscription!: Subscription;

  constructor(private postsService: PostsService, private redditService: RedditService, public dialog: MatDialog) { }

  get isFetchingPosts(): boolean {
    return this.redditService.getIsFetchingPosts();
  }

  ngOnInit(): void {
    this.postsSubscription = this.postsService.postsChanged
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        () =>
          this.posts = this.postsService.getSlicedPosts(this.pageSize * this.currentPage, this.pageSize * this.currentPage + this.pageSize)
      );
    this.getPosts();
  }

  private getPosts(): void {
    this.redditService.fetchPosts(this.pageSize);
  }

  handlePageChange(): void {
    this.postsService.clearPosts();
    this.redditService.clearAfter();
    this.currentPage = 0;
    this.getPosts();
  }

  getNextPosts(): void {
    this.currentPage = this.currentPage + 1;
    this.getPosts();
  }

  getPreviousPosts(): void {
    this.currentPage = this.currentPage - 1;
    this.posts = this.postsService.getSlicedPosts(this.pageSize * this.currentPage, this.pageSize * this.currentPage + this.pageSize);
  }

  openDialog(post: RedditPost): void {
    this.dialog.open(PostDialogComponent, {
      width: '600px',
      data: post
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
