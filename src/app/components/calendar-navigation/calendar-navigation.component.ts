import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DateService  } from './../../services/date.service'

@Component({
  selector: 'app-calendar-navigation',
  templateUrl: './calendar-navigation.component.html',
  styleUrls: ['./calendar-navigation.component.scss']
})
export class CalendarNavigationComponent implements OnInit, OnDestroy {
  
  public date: Date = new Date()
  public date$: Subscription | null = null
  
  constructor(private dateService: DateService) {}

  ngOnInit(): void {
    if (this.date$) return 
    this.date$ = this.dateService.getDate().subscribe({next: date => this.date = date })
  }

  changeDate(number: number) {
    this.dateService.changeDate(this.date, number)
  }

  ngOnDestroy() {
    if (!this.date$) return
    this.date$.unsubscribe()
  }

}
