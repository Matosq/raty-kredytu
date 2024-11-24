import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  private backgroundImageCssClassName = 'background';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private title: Title,
    private meta: Meta
  ) { }

  public ngOnInit(): void {
    this.lazyLoadBackgroundImage();
    this.setTags();
  }

  private lazyLoadBackgroundImage(): void {
    const bodyElement = this.document.body;
    if (bodyElement) {
      bodyElement.classList.add(this.backgroundImageCssClassName);
    }
  }

  private setTags(): void {
    this.title.setTitle('Kalkulator kredytu hipotecznego | ratykredytu.pl');

    this.meta.addTag({ name: 'description', content: 'Oblicz raty i całkowity koszt kredytu uwzględniając zmiany oprocentowania, nadpłaty, koszty dodatkowe oraz transze.' });
    this.meta.addTag({ name: 'author', content: 'Matosq' });
    this.meta.addTag({ name: 'copyright', content: 'Matosq' });
    this.meta.addTag({ name: 'msapplication-TileColor', content: '#da532c' });
    this.meta.addTag({ name: 'theme-color', content: '#7573A9' });
    this.meta.addTag({ name: 'viewport', content: 'width=device-width, initial-scale=1' });
    this.meta.addTag({ charset: 'utf-8' });

    this.meta.addTag({ name: 'og:title', content: 'Kalkulator kredytu hipotecznego | ratykredytu.pl' });
    this.meta.addTag({ name: 'og:url', content: 'https://www.ratykredytu.pl/' });
    this.meta.addTag({
      name: 'og:description',
      content: 'Oblicz raty i całkowity koszt kredytu uwzględniając zmiany oprocentowania, nadpłaty, koszty dodatkowe oraz transze.'
    });

    this.meta.addTag({ name: 'og:image', content: 'https://www.ratykredytu.pl/assets/banknot-200-zlotych.png' });
    this.meta.addTag({ name: 'og:type', content: 'website' });
    this.meta.addTag({ name: 'og:locale', content: 'pl_PL' });
    this.meta.addTag({ name: 'og:image:type', content: 'image/png' });
    this.meta.addTag({ name: 'og:image:width', content: '1200' });
    this.meta.addTag({ name: 'og:image:height', content: '600' });
    this.meta.addTag({ name: 'og:image:alt', content: 'Banknot o wartości 200zł.' });
  }
}
