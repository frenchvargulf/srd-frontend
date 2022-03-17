import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { RedditPost } from '../RedditPost';

@Component({
  selector: 'srd-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  @Input() post?: RedditPost;

  constructor() { }
}
