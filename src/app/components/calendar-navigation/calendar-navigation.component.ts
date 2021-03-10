import { Component, Input } from '@angular/core';
import { DateService } from './../../services/date/date.service'

@Component({
  selector: 'app-calendar-navigation',
  templateUrl: './calendar-navigation.component.html',
  styleUrls: ['./calendar-navigation.component.scss']
})
export class CalendarNavigationComponent {
  
  @Input() date: Date = new Date() 
  
  constructor(private dateService: DateService) {}
  
  changeDate(number: number): void {
    this.dateService.changeDate(this.date, number)
  } 

}
