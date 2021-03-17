import { ITeam } from "../interfaces/team"

export default class TeamUtils {
  static getPercentageOfAbsentCount(team: ITeam, date: Date): number {
    return date.getFullYear() === new Date().getFullYear() 
    ? team.percentageOfAbsent[date.getMonth()] 
    : 0
  }
} 