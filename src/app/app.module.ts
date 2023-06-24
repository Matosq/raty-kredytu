import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import '@angular/common/locales/global/pl';
import { AppComponent } from './app.component';
import { CalculatorModule } from './calculator/calculator.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavModule } from './main-nav/main-nav.module';
import { FooterModule } from './footer/footer.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CalculatorModule,
    BrowserAnimationsModule,
    MainNavModule,
    FooterModule
  ],
  providers: [{
    provide: LOCALE_ID, useValue: 'pl-PL'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
