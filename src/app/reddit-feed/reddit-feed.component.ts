import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { RedditPost } from '../RedditPost';
import { Subscription } from 'rxjs';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RedditService } from '../services/reddit.service';
import { OnDestroy } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

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
  private postsSubscription!: Subscription;

  constructor(private postsService: PostsService, private redditService: RedditService, public dialog: MatDialog) { }

  ngOnInit() {
    this.postsSubscription = this.postsService.postsChanged
      .subscribe(
        (posts: RedditPost[]) => {
          this.posts = this.postsService.getSlicedPosts(this.pageSize * this.currentPage, this.pageSize * this.currentPage + this.pageSize)
        }
      );
    this.getPosts();
  }

  private getPosts() {
    this.redditService.fetchPosts(this.pageSize);
  }

  handlePageChange(e: MatSelectChange) {
    this.postsService.clearPosts();
    this.redditService.clearAfter();
    this.currentPage = 0;
    this.getPosts();
  }

  getNextPosts() {
    this.currentPage = this.currentPage + 1;
    this.getPosts();
  }

  getPreviousPosts() {
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
    this.postsSubscription.unsubscribe();
  }
}
