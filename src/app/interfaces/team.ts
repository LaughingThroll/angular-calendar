import { IMember } from './member'

export interface ITeam {
  name: string
  percentageOfAbsent: number[]
  members: IMember[]
  teamId: number
}
