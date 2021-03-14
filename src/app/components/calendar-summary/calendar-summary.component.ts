import { Component, Input, OnChanges } from '@angular/core';

import { ITeam } from '../../interfaces/DB'

@Component({
  selector: 'app-calendar-summary',
  templateUrl: './calendar-summary.component.html',
  styleUrls: ['./calendar-summary.component.scss']
})
export class CalendarSummaryComponent implements OnChanges {

  @Input() date: Date = new Date()
  @Input() teams: ITeam[] = []

  public countUsers: number = 0
  public percent: number = 0

  constructor() { }

  ngOnChanges(): void {
    this.countUsers = this.teams.reduce((acc, team) => acc += team.members.length, 0)
    this.percent = this.teams.reduce((acc, team) => acc += team.percentageOfAbsent[this.date.getMonth()], 0)
  }
}
