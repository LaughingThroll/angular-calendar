import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { DirectionEnum, NavigationEnum } from 'src/app/interfaces/enums'
import { DateService } from '../../services/date/date.service'

@Component({
  selector: 'app-calendar-navigation',
  templateUrl: './calendar-navigation.component.html',
  styleUrls: ['./calendar-navigation.component.scss']
})
export class CalendarNavigationComponent implements OnInit, OnDestroy {

  @Input() date: Date = new Date()

  constructor(private dateService: DateService) { }

  ngOnInit() {
    this.navigationKeyboardInit()
  }

  private navigationKeyboardInit() {
    window.addEventListener('keydown', this.navigationKeyboardHandler) 
  }

  private navigationKeyboardHandler = (e: KeyboardEvent) => {
    if (e.key === DirectionEnum.ARROW_LEFT) {
      e.preventDefault()
      this.changeDate(NavigationEnum.PREV)
    }

    if (e.key === DirectionEnum.ARROW_RIGHT) {
      e.preventDefault()
      this.changeDate(NavigationEnum.NEXT)
    }
  }

  changeDate(string: 'next' | 'prev'): void {
    this.dateService.changeDate(this.date, string)
  }

  ngOnDestroy() {
    window.removeEventListener('keydown', this.navigationKeyboardHandler)
  }
}
