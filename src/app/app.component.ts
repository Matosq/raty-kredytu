import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public title = 'raty kredytu';
  private backgroundImageCssClassName = 'background';

  constructor(@Inject(DOCUMENT) private document: Document) { }

  public ngOnInit(): void {
    this.lazyLoadBackgroundImage();
  }

  private lazyLoadBackgroundImage(): void {
    const bodyElement = this.document.body;
    if (bodyElement) {
      bodyElement.classList.add(this.backgroundImageCssClassName);
    }
  }
}
