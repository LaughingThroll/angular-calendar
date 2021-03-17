import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

import { NavigationEnum } from '../../interfaces/enums'

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private _date$: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date())

  getDate(): Observable<Date> {
    return this._date$.asObservable()
  }
  
  changeDate(date: Date, string: 'next' | 'prev'): void {
    let number: number = 0
    if (string === NavigationEnum.NEXT) number = 1
    if (string === NavigationEnum.PREV) number = -1
    this._date$.next(new Date(date.setMonth(date.getMonth() + number)))
  }
}
