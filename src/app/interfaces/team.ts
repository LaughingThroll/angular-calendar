import { IMember } from './member'
import { IFirebaseData, ID } from './common'

interface ITeamMain {
  name: string
  percentageOfAbsent: number[]
  id: ID
}

export interface ITeamResponse extends ITeamMain {
  members: IFirebaseData<IMember>
}

export interface ITeam extends ITeamMain {
  members: IMember[]
}


