import { Component, OnInit } from '@angular/core'
import { Subject } from 'rxjs'

import { DateService } from './services/date/date.service'
import { TeamsService } from './services/teams/teams.service'

import DateUtils from './utils/DateUtils'

import { ITeam } from './interfaces/team'
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private unsubscribe$: Subject<any> = new Subject()

  public date: Date = new Date()
  public allDays: Date[] = []
  public teams: ITeam[] = []

  constructor(
    private dateService: DateService,
    private teamsService: TeamsService
  ) { }

  ngOnInit(): void {
    this.subscribeDate()
    this.subscribeTeams()
  }

  subscribeDate(): void {
    this.dateService.getDate()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: date => {
          this.date = date
          this.allDays = DateUtils.getAllDayInMonth(date)
        },
        error: err => {
          throw new Error('Что то с датой!!! ' + err)
        }
      })
  }

  subscribeTeams(): void {
    this.teamsService.getTeams()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: teams => this.teams = teams,
        error: err => {
          throw new Error('Как то неполучилось обработать запрос !!!' + err)
        }
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}