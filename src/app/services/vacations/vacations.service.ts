import { Injectable } from '@angular/core'
import { IVacation, TVacation } from 'src/app/interfaces/DB'
import { DateService } from '../date/date.service'

@Injectable({
  providedIn: 'root'
})
export class VacationsService {

  constructor(private dateService: DateService) { }
  
  private checkVacation = (cellDate: Date, startDate: string, endDate: string, separator: string = '.'): boolean => {
    return cellDate >= new Date(this.dateService.formatDate(startDate.split(separator))) &&
    cellDate <= new Date(this.dateService.formatDate(endDate.split(separator))) 
  }
  
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
 
  exsistTypeVacation = (vacations: IVacation[], cellDate: Date, type: TVacation = "Paid"): boolean => {
    return vacations
      .map(({ startDate, endDate, type }) => (this.checkVacation(cellDate, startDate, endDate) ? type : null))
      .some(el => el === type)
  }

  isFirstOrLastDay = (vacations: IVacation[], date: Date, typeDay: "start" | "end" = "start") => {
    return vacations
      .map((el) => {
        const dateArr = el[typeDay + "Date"].split(".")
        return date.getDate() === +dateArr[0] && date.getMonth() + 1 === +dateArr[1]
      })
      .some(Boolean)
  }
  

}
