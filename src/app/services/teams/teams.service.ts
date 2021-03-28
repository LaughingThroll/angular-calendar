import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable, of } from 'rxjs'
import { switchMap, catchError } from 'rxjs/operators'

import { ITeam } from 'src/app/interfaces/team'
import { IDepartmentTeams } from 'src/app/interfaces/departmentTeams'
import { IVacation } from 'src/app/interfaces/vacation'

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private TEAMS_URL: string = "https://calendar-25b31-default-rtdb.firebaseio.com/"

  constructor(private http: HttpClient) { }

  getTeams(): Observable<ITeam[]> {
    return this.http.get<IDepartmentTeams>(`${this.TEAMS_URL}.json`)
    .pipe(
      switchMap(({teams}) => of(teams)),
      catchError(err => of(err))
    )
  }
  // /teams/0/members/0/vacations
  // TODO: Здесь нужен нормальный back-end чтобы не обновлять всю базу данных, а только отпуск 
  putVacation(teams: ITeam[]): Observable<object> {
    return this.http.put(`${this.TEAMS_URL}.json`, { teams }) 
  } 

  
}


