import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CalendarNavigationComponent } from './components/calendar-navigation/calendar-navigation.component';
// import { DateService } from './services/date.service';

@NgModule({
  declarations: [
    AppComponent,
    CalendarNavigationComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
