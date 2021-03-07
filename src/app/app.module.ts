import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { CalendarNavigationComponent } from './components/calendar-navigation/calendar-navigation.component';


@NgModule({
  declarations: [
    AppComponent,
    CalendarNavigationComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
