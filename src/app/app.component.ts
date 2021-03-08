import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'

import { DateService } from './services/date/date.service'
import { DataService } from './services/data/data.service'
 
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
  public date$?: Subscription
  public teams$?: Subscription 

  constructor(
    private dateSevice: DateService, 
    private dataService: DataService
    ) { }

  ngOnInit(): void {
    this.date$ = this.dateSevice.getDate().subscribe({
      next: date => {
        this.date = date
        this.allDays = this.dateSevice.getAllDayInMonth(date)
      }
    })

    this.teams$ = this.dataService.getTeams().subscribe({
      next: teams => this.teams = teams,
      error: err => console.log('Custom Error', err)
    })
  }

  ngOnDestroy(): void {
    this.date$?.unsubscribe()
    this.teams$?.unsubscribe()
  }
}