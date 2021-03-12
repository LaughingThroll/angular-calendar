import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'

import { DateService } from './services/date/date.service'
import { TeamsService } from './services/teams/teams.service'
 
import { ITeam } from './interfaces/DB'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public date: Date = new Date() 
  public allDays: Date[] = []
  public teams: ITeam[] = []  

  constructor(
    private dateSevice: DateService, 
    private teamsService: TeamsService
    ) { }

  ngOnInit(): void {
    this.subscriberDate()
    this.subscriberTeams() 
  }

  subscriberDate(): Subscription {
    return this.dateSevice.getDate().subscribe({
      next: date => {
        this.date = date
        this.allDays = this.dateSevice.getAllDayInMonth(date)
      }
    })
  }

  subscriberTeams(): Subscription {
    return this.teamsService.getTeams().subscribe({
      next: teams => this.teams = teams,
      error: err => console.log('Custom Error', err)
    })
  }

  ngOnDestroy(): void {
    this.subscriberDate().unsubscribe()
    this.subscriberTeams().unsubscribe()
  }
}