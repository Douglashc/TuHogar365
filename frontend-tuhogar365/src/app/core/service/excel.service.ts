import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseAPIClass } from '../class/baseAPI.class';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelService extends BaseAPIClass {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = '/excel';
  }

  exportarExcel(servicio,filterObject?:any):Observable<any>{
    let queryString = '';
    if (filterObject) {
      const fitlerKeys: any[] = Object.keys(filterObject);
      if (fitlerKeys.length > 0) {
        queryString = '?';
      }
      fitlerKeys.forEach((key: any, index) => {
        if (filterObject[key] !== undefined && filterObject[key] !== null) {
          if (filterObject[key].toString().length) {
            queryString += `${key}=${filterObject[key]}&`;
          }
        }
      });
      if (
        fitlerKeys.length > 0 &&
        queryString[queryString.length - 1] === '&'
      ) {
        queryString = queryString.slice(0, -1);
      }
      
    }
    return this.httpClient.get(`${this.baseUrl}/${servicio}${queryString}`, {responseType:'blob'}).pipe(
      map((body: any) => {
        return body;
      },)
    );
  }

}
