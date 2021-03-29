import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable, of } from 'rxjs'
import { catchError } from 'rxjs/operators'

import { MAIN_URL } from '../../constant'

import { ITeam } from 'src/app/interfaces/team'
import { ITeams } from 'src/app/interfaces/teams'
import { IVacation } from 'src/app/interfaces/vacation'

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private TEAMS_URL: string = `${MAIN_URL}teams`

  constructor(private http: HttpClient) { }

  getTeams(): Observable<ITeam[]> {
    return this.http.get<ITeams>(`${this.TEAMS_URL}.json`)
    .pipe(catchError(err => of(err)))
  }

  putVacation(teamIndex: number, memberIndex: number, vacationIndex: number, vacation: IVacation): Observable<object> {
    return this.http.patch(`${this.TEAMS_URL}/${teamIndex}/members/${memberIndex}/vacations.json`, { [vacationIndex]: vacation }) 
  }   
}


