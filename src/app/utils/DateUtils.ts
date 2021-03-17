import { createArrayFromNumber } from './forArrays'

export default class DateUtils {
  static formatDateInKebabCase(date: Date): string {
    return date.toISOString().match(/\d{4}-\d{2}-\d{2}/)![0]
  }

  static reverseDate(arr: string[], separator: string = '.'): string {
    return arr.reverse().join(separator)
  }

  static countDayFromTimeStamp = (timestamp: number): number => {
    const oneDay: number = 1000 * 60 * 60 * 24
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