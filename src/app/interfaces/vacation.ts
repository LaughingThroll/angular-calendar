import { VacationEnum } from './enums'

export interface IVacation {
  [key: string]: string
  startDate: string
  endDate: string
  type: VacationEnum
}