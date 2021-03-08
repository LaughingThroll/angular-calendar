import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CalendarNavigationComponent } from './components/calendar-navigation/calendar-navigation.component'
import { CalendarHeaderComponent } from './components/calendar-header/calendar-header.component'
import { CalendarBodyComponent } from './components/calendar-body/calendar-body.component'
import { CellsComponent } from './components/cells/cells.component';
import { TeamComponent } from './components/team/team.component'


@NgModule({
  declarations: [
    AppComponent,
    CalendarNavigationComponent,
    CalendarHeaderComponent,
    CalendarBodyComponent,
    CellsComponent,
    TeamComponent
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
