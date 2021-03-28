import DateUtils from './DateUtils'

import { IVacation } from './../interfaces/vacation'
import { VacationEnum } from './../interfaces/enums'

export default class VacationsUtils {

  private static checkVacation(cellDate: Date, startDate: string, endDate: string, separator: string = '.'): boolean {
    return cellDate >= new Date(DateUtils.reverseDate(startDate.split(separator))) &&
      cellDate <= new Date(DateUtils.reverseDate(endDate.split(separator)))
  }

  private static getCheckedDay(date: Date, dateArr:  string[]): boolean {
    const [ day, month ] = dateArr.map(Number)
    return date.getDate() === day && date.getMonth() + 1 === month
  } 

  static getSplitVacations(vacations: IVacation[], lastDay: number, separator: string = '.'): IVacation[] {
    return vacations.flatMap(vacation => {
      const { startDate, endDate, type } = vacation
      const [ , startMonth, startYear ] = startDate.split(separator).map(Number)
      const [ , endMonth, endYear ] = endDate.split(separator).map(Number)
      
      if (startMonth !== endMonth) {
        return [
          {
            startDate,
            endDate: [lastDay, startMonth, startYear].join(separator),
            type
          },
          {
            startDate: ['01', endMonth, endYear].join(separator),
            endDate,
            type
          }
        ]
      }
      return vacation
    })
  }

  static vacationIsExist(currentVacations: IVacation[], vacation: IVacation, separator: string = '.'): boolean {
    return !currentVacations.find(( { startDate, endDate } ) => {
      const [ currentStartDay, currentStartMonth ] = vacation.startDate.split(separator).map(Number)
      const [ currentEndDay, currentEndMonth ] = vacation.endDate.split(separator).map(Number) 
      const [ startDay, startMonth ] = startDate.split(separator).map(Number)
      const [ endDay, endMonth ] = endDate.split(separator).map(Number)

      return  (currentStartDay >= startDay  && currentStartMonth === startMonth) ||  
      (currentEndDay <= endDay && currentEndMonth  === endMonth) 
    })
  }

  static getExsistingTypeVacation(vacations: IVacation[], cellDate: Date, type: VacationEnum.PAID | VacationEnum.UNPAID = VacationEnum.PAID): boolean {
    return vacations
      .map(({ startDate, endDate, type }) => (this.checkVacation(cellDate, startDate, endDate) ? type : null))
      .some(el => el === type)
  }

  static isFirstDay(vacations: IVacation[], date: Date, separator: string = '.'): boolean {
    return vacations.map(({ startDate }) => this.getCheckedDay(date, startDate.split(separator)))
      .some(Boolean)
  }

  static isLastDay(vacations: IVacation[], date: Date, separator: string = '.'): boolean {
    return vacations.map(({endDate}) => this.getCheckedDay(date, endDate.split(separator)))
      .some(Boolean)
  }

  static getFilteredVacationsByMonth(vacations: IVacation[], cellDate: Date, separator: string = '.'): IVacation[] {
    return vacations.filter(({ startDate }) => {
      const [, startMonth, startYear ] = startDate.split(separator).map(Number)
      return cellDate.getMonth() + 1 === startMonth && cellDate.getFullYear() === startYear 
    })
  }

  static getSumVacationsDaysByMonth(vacations: IVacation[], cellDate: Date, separator: string = '.'): number {
    const filteredArray = this.getFilteredVacationsByMonth(vacations, cellDate)
    const { reverseDate, countDayFromTimeStamp } = DateUtils

    return filteredArray.reduce((acc, { startDate, endDate }) => {
      const diff = Date.parse(reverseDate(endDate.split(separator))) - Date.parse(reverseDate(startDate.split(separator)))
      return acc += countDayFromTimeStamp(diff) 
    }, 0)
  }

  static getSumVacationsDaysByDay(vacations: IVacation[], cellDate: Date, separator: string = '.'): number {
    const filteredVacations = this.getFilteredVacationsByMonth(vacations, cellDate)
    
    return filteredVacations.reduce((acc, { startDate, endDate }) => {
      const [ startDay ] = startDate.split(separator).map(Number)
      const [ endDay ] = endDate.split(separator).map(Number)          
      return acc += +(cellDate.getDate() >= startDay && cellDate.getDate() <= endDay) 
    }, 0)
  }
}