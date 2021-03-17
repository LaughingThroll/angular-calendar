import { Component, Input, OnChanges } from '@angular/core';
import TeamUtils from 'src/app/utils/TeamUtils';

import { ITeam } from '../../interfaces/team'

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
    this.countUsers = this.getCountUsers(this.teams)
    this.percent = this.getPercent(this.teams, this.date)

  }

  getCountUsers(teams: ITeam[]): number {
    return teams.reduce((acc, team) => acc += team.members.length, 0)
  }

  getPercent(teams: ITeam[], date: Date): number {
    return teams.reduce((acc, team) => acc += TeamUtils.getPercentageOfAbsentCount(team, date), 0)
  }
}
