import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DateService } from './services/date.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  public allDays: Date[] = []
  public allDays$: Subscription | null = null

  constructor(private dateSevice: DateService) {}

  ngOnInit(): void {
    this.allDays$ = this.dateSevice.getDate().subscribe({
      next: (date) => {
        this.allDays = this.dateSevice.getAllDayInMonth(date)
      }
    })
  }

  isWeekend(date: Date): boolean {
    return this.dateSevice.isWeekend(date)
  }

  ngOnDestroy(): void {
    this.allDays$?.unsubscribe()
  }
}