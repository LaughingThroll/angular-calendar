import { HttpHeaders, HttpParams } from "@angular/common/http"

export interface IDeafaultOptionsForPUT {
  headers?: HttpHeaders | {
    [header: string]: string | string[]
  }
  observe?: 'body'
  params?: HttpParams | {
    [param: string]: string | string[]
  }
  reportProgress?: boolean
  responseType?: 'json'
  withCredentials?: boolean
}
