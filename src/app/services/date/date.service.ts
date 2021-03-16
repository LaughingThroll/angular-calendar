import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'


import { createArrayFromNumber } from '../../utils/forArrays'
import { NavigationEnum } from '../../interfaces/enums'

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private _date$: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date())

  constructor() { }

  lastDayInMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  } 
  
  getDate(): Observable<Date> {
    return this._date$.asObservable()
  }

  changeDate(date: Date, string: 'next' | 'prev'): void {
    let number: number = 0
    if (string === NavigationEnum.NEXT) number = 1
    if (string === NavigationEnum.PREV) number = -1
    this._date$.next(new Date(date.setMonth(date.getMonth() + number)))
  }

  getAllDayInMonth(date: Date): Date[] {
    return createArrayFromNumber(this.lastDayInMonth(date))
      .map((day: number) => new Date(new Date(date.getFullYear(), date.getMonth(), day)))
  }


  isWeekend(date: Date): boolean {
    return date.getDay() === 6 || date.getDay() === 0
  }

  formatDateInKebabCase(date: Date): string {
    return date.toISOString().match(/\d{4}-\d{2}-\d{2}/)![0]
  }

  formatDate(arr: string[], separator: string = '.'): string {
    return arr.reverse().join(separator)
  }

  countDayFromTimeStamp = (timestamp: number): number => {
    const oneDay: number = 1000 * 60 * 60 * 24
    let startDay: number = 0
    for (let i = 0; i <= timestamp; i += oneDay) startDay++
    return startDay
  }
}
