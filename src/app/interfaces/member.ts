import { IVacation } from './vacation'
import { ID } from './common'
import { IFirebaseData } from './common'

interface IMemberMain {
  name: string
  id: ID
}

export interface IMemberResponse extends IMemberMain {
  vacations: IFirebaseData<IVacation>
}

export interface IMember extends IMemberMain {
  vacations: IVacation[]
}