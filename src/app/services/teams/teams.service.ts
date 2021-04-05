import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

import { MAIN_URL } from '../../constant'

import { ITeam } from 'src/app/interfaces/team'
import { ITeams, ITeamsResponse } from 'src/app/interfaces/teams'
import { ID } from 'src/app/interfaces/common' 
import { IVacation } from 'src/app/interfaces/vacation'
import { IMember } from 'src/app/interfaces/member'

interface IIDs {
  teamID: ID
  memberID: ID
}
 
@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private TEAMS_URL: string = `${MAIN_URL}/teams`

  constructor(private http: HttpClient) { }

  getTeams(): Observable<ITeam[]> {
    return this.http.get<ITeamsResponse>(`${this.TEAMS_URL}.json`)
      .pipe(
        map(teams => {
          const newTeams: ITeam[] = Object.values(teams)
          newTeams.forEach(team => {
            team.members = Object.values(team.members)
            team.members.forEach(member => member.vacations = Object.values(member.vacations))
          })
          return newTeams
        }),
        catchError(err => of(err))
      )
  }

  putVacation(IDs: IIDs, vacation: IVacation): Observable<object> {
    return this.http.patch(`${this.TEAMS_URL}/${IDs.teamID}/members/${IDs.memberID}/vacations.json`, { [Date.now()]: vacation })
  }
}


