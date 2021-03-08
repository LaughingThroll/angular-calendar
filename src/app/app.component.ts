import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { DateService } from './services/date/date.service'
import { DataService } from './services/data/data.service'

import { THEMES } from './constant'
import { ITeam } from './interfaces/DB'
import { TThemes } from './interfaces/utils'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public allDays: Date[] = []
  public teams: ITeam[] = []
  public THEMES: TThemes[] = THEMES 
  public allDays$: Subscription | null = null
  public teams$: Subscription | null = null

  constructor(private dateSevice: DateService, private dataService: DataService) { }

  ngOnInit(): void {
    this.allDays$ = this.dateSevice.getDate().subscribe({
      next: date => this.allDays = this.dateSevice.getAllDayInMonth(date)
    })

    this.teams$ = this.dataService.getTeams().subscribe({
      next: teams => this.teams = teams,
      error: err => console.log('Custom Error', err)
    })
  }

  isWeekend(date: Date): boolean {
    return this.dateSevice.isWeekend(date)
  }


  ngOnDestroy(): void {
    this.allDays$?.unsubscribe()
    this.teams$?.unsubscribe()
  }
}