import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { PostComponent } from './post/post.component';
import { AppRouters } from './app.routes';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PostDialogComponent } from './post-dialog/post-dialog.component';
import { PostsService } from './services/posts.service';
import { RedditFeedComponent } from './reddit-feed/reddit-feed.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostDialogComponent,
    RedditFeedComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AppRouters,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRouters,
    FormsModule,
  ],
  providers: [PostsService],
  bootstrap: [AppComponent],
  entryComponents: [
    PostDialogComponent
  ],
})
export class AppModule { }
