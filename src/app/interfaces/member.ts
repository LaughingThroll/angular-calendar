import { IVacation } from './vacation'
import { ID } from './common'

export interface IMember {
  name: string
  memberId: ID
  vacations: IVacation[]
}