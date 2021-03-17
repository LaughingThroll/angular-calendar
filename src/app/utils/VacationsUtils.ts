import DateUtils from './DateUtils'

import { IVacation } from './../interfaces/vacation'
import { VacationEnum } from './../interfaces/enums'

export default class VacationsUtils {

  private static checkVacation(cellDate: Date, startDate: string, endDate: string, separator: string = '.'): boolean {
    return cellDate >= new Date(DateUtils.reverseDate(startDate.split(separator))) &&
      cellDate <= new Date(DateUtils.reverseDate(endDate.split(separator)))
  }

  private static getCheckedDay(date: Date, dateArr: string[]): boolean {
    return date.getDate() === +dateArr[0] && date.getMonth() + 1 === +dateArr[1]
  } 

  static getSplitVacations(vacations: IVacation[], lastDay: number, separator: string = '.'): IVacation[] {
    return vacations.flatMap(vacation => {
      const { startDate, endDate, type } = vacation
      const startDateArr = startDate.split(separator)
      const endDateArr = endDate.split(separator)
      
      if (+startDateArr[1] !== +endDateArr[1]) {
        return [
          {
            startDate,
            endDate: `${lastDay}${separator}${startDateArr[1]}${separator}${startDateArr[2]}`,
            type
          },
          {
            startDate: `01${separator}${endDateArr[1]}${separator}${endDateArr[2]}`,
            endDate,
            type
          }
        ]
      }
      return vacation
    })
  }

  static getExsistingTypeVacation(vacations: IVacation[], cellDate: Date, type: VacationEnum.PAID | VacationEnum.UNPAID = VacationEnum.PAID): boolean {
    return vacations
      .map(({ startDate, endDate, type }) => (this.checkVacation(cellDate, startDate, endDate) ? type : null))
      .some(el => el === type)
  }

  static getIsFirstDay(vacations: IVacation[], date: Date): boolean {
    return vacations.map(({ startDate }) => this.getCheckedDay(date, startDate.split(".")))
      .some(Boolean)
  }

  static getIsLastDay(vacations: IVacation[], date: Date): boolean {
    return vacations.map(({endDate}) => this.getCheckedDay(date, endDate.split(".")))
      .some(Boolean)
  }

  static getFilteredVacationsByMonth(vacations: IVacation[], cellDate: Date, separator: string = '.'): IVacation[] {
    return vacations.filter(({ startDate }) => {
      const startDateArr = startDate.split(separator)
      const currentDateArr = DateUtils.formatDateInKebabCase(cellDate).split("-").reverse()
      return +startDateArr[1] === +currentDateArr[1] && +startDateArr[2] === +currentDateArr[2]
    })
  }

  static getSumVacationsDays(vacations: IVacation[], cellDate: Date, separator: string = '.'): number {
    const filteredArray = this.getFilteredVacationsByMonth(vacations, cellDate)
    const { reverseDate, countDayFromTimeStamp } = DateUtils

    return filteredArray.reduce((acc, { startDate, endDate }) => {
      const diff = Date.parse(reverseDate(endDate.split(separator))) - Date.parse(reverseDate(startDate.split(separator)))
      return acc += countDayFromTimeStamp(diff)
    }, 0)
  }

}