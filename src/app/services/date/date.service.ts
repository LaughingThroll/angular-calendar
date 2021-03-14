import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

import { createArrayFromNumber } from '../../utils/array'

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private _date$: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date())

  constructor() { }

  daysInMonth = (date: Date): number => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

  getDate = (): Observable<Date> => this._date$.asObservable()

  changeDate(date: Date, number: number): void {
    this._date$.next(new Date(date.setMonth(date.getMonth() + number)))
  }

  getAllDayInMonth(date: Date): Date[] {
    return createArrayFromNumber(this.daysInMonth(date))
      .map((day: number) => new Date(new Date(date.getFullYear(), date.getMonth(), day)))
  }

  isWeekend = (date: Date): boolean => date.getDay() === 6 || date.getDay() === 0 

  formatDate = (arr: string[], separator: string = '.'): string => arr.reverse().join(separator)
  formatDateInKebabCase = (date: Date): string => date.toISOString().match(/\d{4}-\d{2}-\d{2}/)![0]

  countDayFromTimeStamp = (timestamp: number): number => {
    const oneDay: number = 1000 * 60 * 60 * 24
    let startDay: number = 0
    for (let i = 0; i <= timestamp; i += oneDay) startDay++
    return startDay
  }
}
