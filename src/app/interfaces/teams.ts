import { ITeam } from './team'
import { IFirebaseData } from './common'

export interface ITeamsResponse {
  teams: IFirebaseData<ITeam>
}

export interface ITeams {
  team: ITeam[]
} 