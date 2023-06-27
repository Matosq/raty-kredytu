import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  protected title = 'raty kredytu';
  private backgroundImageCssClassName = 'background';

  public ngOnInit(): void {
    this.lazyLoadBackgroundImage();
  }

  private lazyLoadBackgroundImage(): void {
    const bodyElement = document.body;
    if (bodyElement) {
      bodyElement.classList.add(this.backgroundImageCssClassName);
    }
  }
}
