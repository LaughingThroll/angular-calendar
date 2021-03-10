import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs'
import { switchMap, catchError } from 'rxjs/operators'

import { TEAMS_URL, OPTIONS_FOR_GET_REQUEST } from '../../constant'
import departmentTeams from '../../api/DB'
import { IDepartmentTeams, ITeam } from 'src/app/interfaces/DB'


@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  constructor(private http: HttpClient) { }

  getTeams(): Observable<ITeam[]> {
    return this.http.put<IDepartmentTeams>(TEAMS_URL, departmentTeams, OPTIONS_FOR_GET_REQUEST)
    .pipe(
      switchMap(res => of(res.teams)),
      catchError(err => of(err))
    )
  }
}
