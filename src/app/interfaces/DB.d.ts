import { HttpHeaders, HttpParams } from "@angular/common/http"

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

interface IDeafaultOptionsForPUT {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?: 'body';
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

export interface ICustomOptionsForPUT extends IDeafaultOptionsForPUT {
  method: "PUT"
}
