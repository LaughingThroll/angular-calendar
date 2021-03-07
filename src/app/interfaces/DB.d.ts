export type ID = number | string
export type TVacation = "Paid" | "UnPaid"

export interface IVacation {
  [key: string]: string
  startDate: string
  endDate: string
  type: TVacation
}

interface IMember {
  name: string
  memberId: ID
  vacations: IVacation[]
}

export interface ITeam {
  name: string
  percentageOfAbsent: number[]
  members: IMember[]
  teamId: number
}

export interface IDepartmentTeams {
  teams: ITeam[]
}
