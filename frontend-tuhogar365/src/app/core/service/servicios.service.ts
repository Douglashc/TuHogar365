import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BaseAPIClass } from '../class/baseAPI.class';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService extends BaseAPIClass{

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = '/servicios';
  }
}
