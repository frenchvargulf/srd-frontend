import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/posts.service';
import { RedditPost } from '../RedditPost';
import { Observable } from 'rxjs';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

@Component({
  selector: 'srd-reddit-feed',
  templateUrl: './reddit-feed.component.html',
  styleUrls: ['./reddit-feed.component.scss']
})
export class RedditFeedComponent implements OnInit {
  posts$: Observable<any> = of([]);

  constructor(public dialog: MatDialog, private dataService: DataService) {
  }

  ngOnInit(): void {
    this.posts$ = this.dataService.getPosts();
  }

  openDialog(post: RedditPost): void {
    this.dialog.open(PostDialogComponent, {
      width: '100%',
      data: post
    });
  }
}
