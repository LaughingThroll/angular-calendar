import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

import { createArrayFromNumber } from '../../utils/array'
import { daysInMonth } from '../../utils/date'

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private _date$: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date())

  constructor() { }

  
  getDate = (): Observable<Date> => this._date$.asObservable()

  changeDate(date: Date, number: number): void {
    this._date$.next(new Date(date.setMonth(date.getMonth() + number)))
  }

  getAllDayInMonth(date: Date): Date[] {
    return createArrayFromNumber(daysInMonth(date))
      .map((day: number) => new Date(new Date(date.getFullYear(), date.getMonth(), day)))
  }

  isWeekend = (date: Date): boolean => date.getDay() === 6 || date.getDay() === 0 

  formatDate = (arr: string[], separator: string = '.'): string => arr.reverse().join(separator)

}
