import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BaseAPIClass } from '../class/baseAPI.class';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseAPIClass {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = '/users';
  }

  getAllRoles(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + '/roles')
  }

  vendedores():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + '/vendedores')
  }

  getMedicos() : Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/medicos`);
  }

}

