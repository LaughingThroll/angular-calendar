import { Component, Input } from '@angular/core'
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

  isPaidCell(vacations: IVacation[], index: number): boolean {
    const newVacations =  VacationsUtils.getSplitVacations(vacations, this.allDays.length)
    this.isPaidCellVariables = VacationsUtils.getExsistingTypeVacation(newVacations, this.allDays[index], VacationEnum.PAID)
    return this.isPaidCellVariables
  }

  isUnPaidCell(vacations: IVacation[], index: number): boolean {
    const newVacations =  VacationsUtils.getSplitVacations(vacations, this.allDays.length)
    this.isUnPaidCellVariables = VacationsUtils.getExsistingTypeVacation(newVacations, this.allDays[index], VacationEnum.UNPAID)
    return this.isUnPaidCellVariables
  }

   isStartDay(vacations: IVacation[], index: number): boolean {
    const newVacations =  VacationsUtils.getSplitVacations(vacations, this.allDays.length)
    this.isStartDayVariables = VacationsUtils.isFirstDay(newVacations, this.allDays[index])
    return this.isStartDayVariables
  }

  isEndDay(vacations: IVacation[], index: number): boolean {
    const newVacations =  VacationsUtils.getSplitVacations(vacations, this.allDays.length)
    this.isEndDayVariables = VacationsUtils.isLastDay(newVacations, this.allDays[index])
    return this.isEndDayVariables
  }

  getSumVacationsDaysByMonth(vacations: IVacation[]): number {
    const newVacations =  VacationsUtils.getSplitVacations(vacations, this.allDays.length)
    return VacationsUtils.getSumVacationsDaysByMonth(newVacations, this.allDays[1])
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
