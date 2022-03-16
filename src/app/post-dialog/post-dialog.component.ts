import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RedditPost } from '../RedditPost';
import { DataService } from '../services/posts.service';

@Component({
  selector: 'srd-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss']
})
export class PostDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<PostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RedditPost,
    public dataService: DataService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
