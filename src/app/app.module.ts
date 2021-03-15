import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatDialogModule } from '@angular/material/dialog'

import { CalendarNavigationComponent } from './components/calendar-navigation/calendar-navigation.component'
import { CalendarTableComponent } from './components/calendar-table/calendar-table.component'
import { CalendarSummaryComponent } from './components/calendar-summary/calendar-summary.component';
import { ModalComponent } from './components/modal/modal.component'


@NgModule({
  declarations: [
    AppComponent,
    CalendarNavigationComponent,
    CalendarTableComponent,
    CalendarSummaryComponent,
    ModalComponent
  ],
  entryComponents: [ModalComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
