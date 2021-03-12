import { Component, OnInit, Input } from '@angular/core'

import { THEMES } from 'src/app/constant'

import { ITeam } from 'src/app/interfaces/DB'
import { TTheme } from 'src/app/interfaces/utils'
import { DateService } from 'src/app/services/date/date.service'


@Component({
  selector: 'app-calendar-table',
  templateUrl: './calendar-table.component.html',
  styleUrls: ['./calendar-table.component.scss']
})
export class CalendarTableComponent {

  public THEMES: TTheme[] = THEMES
  
  @Input() teams: ITeam[] = []
  @Input() allDays: Date[] = []

  constructor(private dateService: DateService) { }


  getTheme = (index: number): TTheme => THEMES[index % THEMES.length]
  isWeekend = (date: Date): boolean => this.dateService.isWeekend(date)

}
