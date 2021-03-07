import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private _date$: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date())
  
  constructor() { }

  getDate() {
    return this._date$.asObservable()
  }
  changeDate(date: Date, number: number) {
    this._date$.next(new Date(date.setMonth(date.getMonth() + number)))
  }
}
