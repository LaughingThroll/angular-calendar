import DateUtils from './DateUtils'

import { IVacation } from './../interfaces/vacation'
import { VacationEnum } from './../interfaces/enums'

interface IVacationDate {
  startDate: string
  endDate: string
} 

export default class VacationsUtils {

  private static checkVacation(cellDate: Date, { startDate, endDate }: IVacationDate, separator: string = '.'): boolean {
    return cellDate >= new Date(DateUtils.reverseDate(startDate.split(separator))) &&
      cellDate <= new Date(DateUtils.reverseDate(endDate.split(separator)))
  }

  private static getCheckedDay(date: Date, dateArr: string[]): boolean {
    const [day, month] = dateArr.toNumber()
    return date.getDate() === day && date.getMonth() + 1 === month
  }

  private static getNormalizeVacationNumber(number: number): string {
    return number < 10 ? `0${number}` : number.toString()
  }

  private static getSplitedVacation(vacation: IVacation, lastDay: number, separator: string = '.'): IVacation[] {
    const { startDate, endDate, type } = vacation
    const [, startMonth, startYear] = startDate.split(separator).toNumber()
    const [, endMonth, endYear] = endDate.split(separator).toNumber()
    return [
      {
        startDate,
        endDate: [lastDay, this.getNormalizeVacationNumber(startMonth), startYear].join(separator),
        type
      },
      {
        startDate: ['01', this.getNormalizeVacationNumber(endMonth), endYear].join(separator),
        endDate,
        type
      }
    ]
  }

  static getSplitVacations(vacations: IVacation[], lastDay: number, separator: string = '.'): IVacation[] {
    return vacations.flatMap(vacation => {
      const { startDate, endDate, type } = vacation
      let [, startMonth, startYear] = startDate.split(separator).toNumber()
      const [, endMonth, endYear] = endDate.split(separator).toNumber()
      const diff = endMonth - startMonth

      if (diff === 1) return this.getSplitedVacation(vacation, lastDay)

      if (diff > 1) {
        const arrVacations = this.getSplitedVacation(vacation, lastDay)
        const fullMonth = (month: number): IVacation => ({
          startDate: ['01', this.getNormalizeVacationNumber(month), endYear].join(separator),
          endDate: [lastDay, this.getNormalizeVacationNumber(month), endYear].join(separator),
          type
        })

        while (startMonth !== endMonth - 1) {
          startMonth += 1
          arrVacations.push(fullMonth(startMonth)) 
        }
        return arrVacations
      } 
      return vacation
    })
  }


  static vacationIncludesVacation({ startDate, endDate }: IVacation, vacation: IVacation, separator: string = '.'): boolean  {
    return VacationsUtils.checkVacation(new Date(DateUtils.reverseDate(vacation.startDate.split(separator))), { startDate, endDate })
  }

  static getExsistingTypeVacation(vacations: IVacation[], cellDate: Date, type: VacationEnum.PAID | VacationEnum.UNPAID = VacationEnum.PAID): boolean {
    return vacations
      .map(({ startDate, endDate, type }) => (this.checkVacation(cellDate, { startDate, endDate }) ? type : null))
      .some(el => el === type)
  }

  static isFirstDay(vacations: IVacation[], date: Date, separator: string = '.'): boolean {
    return vacations.map(({ startDate }) => this.getCheckedDay(date, startDate.split(separator)))
      .some(Boolean)
  }

  static isLastDay(vacations: IVacation[], date: Date, separator: string = '.'): boolean {
    return vacations.map(({ endDate }) => this.getCheckedDay(date, endDate.split(separator)))
      .some(Boolean)
  }

  static getFilteredVacationsByMonth(vacations: IVacation[], cellDate: Date, separator: string = '.'): IVacation[] {
    return vacations.filter(({ startDate }) => {
      const [, startMonth, startYear] = startDate.split(separator).toNumber()
      return cellDate.getMonth() + 1 === startMonth && cellDate.getFullYear() === startYear
    })
  }

  static getSumVacationsDaysByMonth(vacations: IVacation[], cellDate: Date, separator: string = '.'): number {
    const filteredArray = this.getFilteredVacationsByMonth(vacations, cellDate)
    const { reverseDate } = DateUtils

    return filteredArray.reduce((acc, { startDate, endDate }) => {
      return acc += new Date(reverseDate(endDate.split(separator))).getDate() + 1 - new Date(reverseDate(startDate.split(separator))).getDate()
    }, 0)
  }

  static getSumVacationsDaysByDay(vacations: IVacation[], cellDate: Date, separator: string = '.'): number {
    const filteredVacations = this.getFilteredVacationsByMonth(vacations, cellDate)

    return filteredVacations.reduce((acc, { startDate, endDate }) => {
      const [startDay] = startDate.split(separator).toNumber()
      const [endDay] = endDate.split(separator).toNumber()
      return acc += +(cellDate.getDate() >= startDay && cellDate.getDate() <= endDay)
    }, 0)
  }
}