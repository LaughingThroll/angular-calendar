import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable, of } from 'rxjs'
import { switchMap, catchError } from 'rxjs/operators'

import { ITeam } from 'src/app/interfaces/team'
import { IDepartmentTeams } from 'src/app/interfaces/departmentTeams'

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private TEAMS_URL: string = "https://calendar-25b31-default-rtdb.firebaseio.com/.json"

  constructor(private http: HttpClient) { }

  getTeams(): Observable<ITeam[]> {
    return this.http.get<IDepartmentTeams>(this.TEAMS_URL)
    .pipe(
      switchMap(({teams}) => of(teams)),
      catchError(err => of(err))
    )
  }
}
