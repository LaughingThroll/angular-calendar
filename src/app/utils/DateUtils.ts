import { createArrayFromNumber } from './forArrays'

const MILISECONDS_IN_ONE_DAY: number = 86400000

export default class DateUtils {
  static formatDateInKebabCase(date: Date): string {
    return date.toISOString().match(/\d{4}-\d{2}-\d{2}/)![0]
  }

  static dateKebabFormat(day: number): string {
    return this.formatDateInKebabCase(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + day))
  }

  static reverseDate(arr: string[], separator: string = '.'): string {
    return arr.reverse().join(separator)
  }

  static countDayFromTimeStamp = (timestamp: number): number => {
    const oneDay: number = MILISECONDS_IN_ONE_DAY
    let startDay: number = 0

    for (let i = 0; i <= timestamp; i += oneDay) startDay++
    return startDay
  }

  static lastDayInMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  } 

  static getAllDayInMonth(date: Date): Date[] {
    return createArrayFromNumber(this.lastDayInMonth(date))
      .map((day: number) => new Date(new Date(date.getFullYear(), date.getMonth(), day)))
  }

  static isWeekend(date: Date): boolean {
    return date.getDay() === 6 || date.getDay() === 0
  }
}