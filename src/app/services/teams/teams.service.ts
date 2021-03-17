import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs'
import { switchMap, catchError } from 'rxjs/operators'

import departmentTeams from '../../api/DB'
import { ITeam } from 'src/app/interfaces/team'
import { IDepartmentTeams } from 'src/app/interfaces/departmentTeams'
import { IDeafaultOptionsForPUT } from 'src/app/interfaces/defaultOptionsForPut'

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  public TEAMS_URL: string = "https://jsonplaceholder.typicode.com/posts/1"
  
  public OPTIONS_FOR_PUT_REQUEST: IDeafaultOptionsForPUT  = {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }

  constructor(private http: HttpClient) { }

  getTeams(): Observable<ITeam[]> {
    return this.http.put<IDepartmentTeams>(this.TEAMS_URL, departmentTeams, this.OPTIONS_FOR_PUT_REQUEST)
    .pipe(
      switchMap(res => of(res.teams)),
      catchError(err => of(err))
    )
  }
}
