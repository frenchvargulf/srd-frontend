import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RedditPost } from '../RedditPost';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'srd-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss']
})
export class PostDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<PostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public postData: RedditPost,
    public postService: PostsService
  ) {}

  public onClose(): void {
    this.dialogRef.close();
  }

}
