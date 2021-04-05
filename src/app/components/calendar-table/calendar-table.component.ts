import { Component, Input, Output, EventEmitter } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ModalComponent } from '../modal/modal.component'

import { THEMES } from 'src/app/constant'

import VacationsUtils from '../../utils/VacationsUtils'
import DateUtils from 'src/app/utils/DateUtils'

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
  // TODO Need refactoring getSplitVacations in every methods 
  private newVacations: IVacation[] = []
  public isPaidCellVariables: boolean = false
  public isUnPaidCellVariables: boolean = false
  public isStartDayVariables: boolean = false
  public isEndDayVariables: boolean = false

  @Input() teams: ITeam[] = []
  @Input() allDays: Date[] = []

  constructor(private dialog: MatDialog) { }

  openModal() {
    this.dialog.open(ModalComponent, {
      data: this.teams
    })
  }

  isWeekend(date: Date): boolean {
    return DateUtils.isWeekend(date)
  }

  takeVacations(vacations: IVacation[]): void {
    this.newVacations = VacationsUtils.getSplitVacations(vacations, this.allDays.length)
  }

  isPaidCell(index: number): boolean {
    this.isPaidCellVariables = VacationsUtils.getExsistingTypeVacation(this.newVacations, this.allDays[index], VacationEnum.PAID)
    return this.isPaidCellVariables
  }

  isUnPaidCell(index: number): boolean {
    this.isUnPaidCellVariables = VacationsUtils.getExsistingTypeVacation(this.newVacations, this.allDays[index], VacationEnum.UNPAID)
    return this.isUnPaidCellVariables
  }

   isStartDay(index: number): boolean {
    this.isStartDayVariables = VacationsUtils.isFirstDay(this.newVacations, this.allDays[index])
    return this.isStartDayVariables
  }

  isEndDay(index: number): boolean {
    this.isEndDayVariables = VacationsUtils.isLastDay(this.newVacations, this.allDays[index])
    return this.isEndDayVariables
  }

  getSumVacationsDaysByMonth(): number {
    return VacationsUtils.getSumVacationsDaysByMonth(this.newVacations, this.allDays[1])
  }

  getSumVacationsDaysByDay(index: number): number {
    const vacations = this.teams.flatMap(({ members }) => members).flatMap(({ vacations }) => vacations)
    const newVacations = VacationsUtils.getSplitVacations(vacations, this.allDays.length)
    return VacationsUtils.getSumVacationsDaysByDay(newVacations, this.allDays[index])
  }

  getTheme(index: number): TTheme {
    return THEMES[index % THEMES.length]
  }
}
