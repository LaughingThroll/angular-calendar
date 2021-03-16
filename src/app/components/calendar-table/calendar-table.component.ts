import { Component, Input } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

import { THEMES } from 'src/app/constant'

import { DateService } from 'src/app/services/date/date.service'
import { VacationsService } from 'src/app/services/vacations/vacations.service'
import { ModalComponent } from '../modal/modal.component'

import { IVacation } from 'src/app/interfaces/vacation'
import { ITeam } from 'src/app/interfaces/team'
import { TTheme } from 'src/app/interfaces/theme'
import { VacationEnum } from 'src/app/interfaces/enums'




@Component({
  selector: 'app-calendar-table',
  templateUrl: './calendar-table.component.html',
  styleUrls: ['./calendar-table.component.scss']
})
export class CalendarTableComponent {

  public THEMES: TTheme[] = THEMES
  public isPaidCellVariables: boolean = false
  public isUnPaidCellVariables: boolean = false
  public isStartDayVariables: boolean = false
  public isEndDayVariables: boolean = false
  private newVacations: IVacation[] = []


  @Input() teams: ITeam[] = []
  @Input() allDays: Date[] = []

  constructor(
    private dateService: DateService,
    private vacationsService: VacationsService,
    private dialog: MatDialog
    ) { }

  openModal() {
    this.dialog.open(ModalComponent)
  }
  splitVacations(vacations: IVacation[]): void {
    this.newVacations = this.vacationsService.splitVacations(vacations, this.allDays.length)
  }

  isPaidCell(date: Date): boolean {
    this.isPaidCellVariables = this.vacationsService.exsistTypeVacation(this.newVacations, date, VacationEnum.PAID)
    return this.isPaidCellVariables
  }

  isUnPaidCell(date: Date): boolean {
    this.isUnPaidCellVariables = this.vacationsService.exsistTypeVacation(this.newVacations, date, VacationEnum.UNPAID)
    return this.isUnPaidCellVariables
  }

  isStartDay(date: Date): boolean {
    this.isStartDayVariables = this.vacationsService.isFirstOrLastDay(this.newVacations, date, "start")
    return this.isStartDayVariables
  }

  isEndDay(date: Date): boolean {
    this.isEndDayVariables = this.vacationsService.isFirstOrLastDay(this.newVacations, date, "end")
    return this.isEndDayVariables
  }

  sumVacationsDaysByMonth(): number {
    // TODO refactoring
    return this.vacationsService.sumVacationsDays(this.newVacations, this.allDays[1])
  }

  sumVacationsDaysByDay(date: Date): number {
    // TODO refactoring
    const vacations = this.teams.flatMap(({ members }) => members).flatMap(({ vacations }) => vacations)
    const newVacations = this.vacationsService.splitVacations(vacations, this.dateService.lastDayInMonth(this.allDays[1]))
    const filteredVacations = this.vacationsService.filterVacationsDateByMonth(newVacations, this.allDays[1])

    return filteredVacations.reduce((acc, { startDate, endDate }) => {
      return date.getDate() >= +startDate.split('.')[0] && date.getDate() <= +endDate.split('.')[0] ? acc += 1 : acc
    }, 0)
  }

  getTheme(index: number): TTheme {
    return THEMES[index % THEMES.length]
  } 
  isWeekend(date: Date): boolean {
    return this.dateService.isWeekend(date)
  } 
}
