import { Injectable } from '@angular/core';
import { IVacation } from 'src/app/interfaces/DB';

@Injectable({
  providedIn: 'root'
})
export class VacationsService {

  constructor() { }

  splitVacations(vacations: IVacation[], lastDay: number, separator: string = '.'): IVacation[] {
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
}
