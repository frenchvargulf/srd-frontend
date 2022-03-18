import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { RedditFeedComponent } from './reddit-feed.component';
import { MatButtonModule } from '@angular/material/button';
import { PostsService } from '../services/posts.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('RedditFeedComponent', () => {
  let component: RedditFeedComponent;
  let fixture: ComponentFixture<RedditFeedComponent>;
  let loader: HarnessLoader;
  let buttonHarness = MatButtonHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatButtonModule, HttpClientTestingModule,
        MatDialogModule, MatFormFieldModule, BrowserAnimationsModule, MatSelectModule
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        PostsService
      ],
      declarations: [RedditFeedComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(RedditFeedComponent);
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should load all button harnesses', async () => {
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    expect(buttons.length).toBe(2);
  });

  it('should load button with exact text', async () => {
    const buttons = await loader.getAllHarnesses(buttonHarness.with({ text: 'Next' }));
    expect(buttons.length).toBe(1);
    expect(await buttons[0].getText()).toBe('Next');
  });

  it('should click a button', async () => {
    const button = await loader.getHarness(buttonHarness.with({ text: 'Next' }));
    await button.click();
    expect(fixture.componentInstance.currentPage).toBe(1);
  });

  it('should click a button', async () => {
    const button = await loader.getHarness(buttonHarness.with({ text: 'Prev' }));
    const nextButton = await loader.getHarness(buttonHarness.with({ text: 'Next' }));
    await nextButton.click();
    await nextButton.click();
    await button.click();
    expect(fixture.componentInstance.currentPage).toBe(1);
  });
});
