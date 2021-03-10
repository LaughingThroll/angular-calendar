import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CalendarNavigationComponent } from './components/calendar-navigation/calendar-navigation.component'
import { CalendarTableComponent } from './components/calendar-table/calendar-table.component'


@NgModule({
  declarations: [
    AppComponent,
    CalendarNavigationComponent,
    CalendarTableComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
