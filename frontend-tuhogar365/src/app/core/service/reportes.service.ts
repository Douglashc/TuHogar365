import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseAPIClass } from '@core/class';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class reportesService extends BaseAPIClass {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = '/reportes'
  }
  getExistencias(id:any):Observable<any>{
    return this.httpClient.get(this.baseUrl + '/existencias?sucursal_id='+id);
  }
  getExistenciasPDF(id:any):Observable<any>{
    return this.httpClient.get(this.baseUrl + '/existenciaspdf?sucursal_id='+id,{responseType:'blob'});
  }
 
  getExistenciasBobinas2(orden:any, term:any):Observable<any>{
    return this.httpClient.get(this.baseUrl + '/lotes?nro='+orden+'&term='+term);
  }

  getExistenciasBobinas2PDF(orden:any, term:any):Observable<any>{
    return this.httpClient.get(this.baseUrl + '/lotespdf?nro='+orden+'&term='+term,{responseType:'blob'});
  }

  getExistenciasDetalle(lote_id:any):Observable<any>{
    return this.httpClient.get(this.baseUrl + '/lotespdf/'+lote_id,{responseType:'blob'});
  }

  getVentas(filterObject?:any):Observable<any>{
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
    return this.httpClient.get(`${this.baseUrl}/ventageneral${queryString}`).pipe(
      map((body: any) => {
        return body;
      },)
    );
  }
  getVentasPDF(filterObject?:any):Observable<any>{
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
    return this.httpClient.get(`${this.baseUrl}/ventageneralpdf${queryString}`,{responseType:'blob'}).pipe(
      map((body: any) => {
        return body;
      },)
    );
  }

  reporteDatos(filterObject?:any):Observable<any>{
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
    return this.httpClient.get(`${this.baseUrl}/datos${queryString}`).pipe(
      map((body: any) => {
        return body;
      },)
    );
  }

  reporteCajaChica(filterObject?:any):Observable<any>{
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
  
  
      return this.httpClient.get(`${this.baseUrl}/cajachicapdf${queryString}`,{responseType:'blob'}).pipe(
        map((body: any) => {
          return body;
        },)
      );
    
  }

  getExistenciasBobinas(filterObject?:any):Observable<any>{
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
    return this.httpClient.get(`${this.baseUrl}/bobinas${queryString}`).pipe(
      map((body: any) => {
        return body;
      },)
    );
  }

  getExistenciasBobinasPDF(id:any, orden:any):Observable<any>{
    return this.httpClient.get(this.baseUrl + '/bobinaspdf?sucursal_id='+id+ '&nro='+orden,{responseType:'blob'});
  }

  getCuentasCobrar(filterObject?:any):Observable<any>{
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
    return this.httpClient.get(`${this.baseUrl}/cuentascobrar${queryString}`).pipe(
      map((body: any) => {
        return body;
      },)
    );
  }
  getCuentasCobrarPDF(filterObject?:any):Observable<any>{
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
    return this.httpClient.get(`${this.baseUrl}/cuentascobrarpdf${queryString}`,{responseType:'blob'}).pipe(
      map((body: any) => {
        return body;
      },)
    );
  }

  getVentasSucursal(id:any,filterObject?:any):Observable<any>{
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
    return this.httpClient.get(`${this.baseUrl}/ventasucursal/${id}${queryString}`).pipe(
      map((body: any) => {
        return body;
      },)
    );
  }
  
  getVentasSucursalPDF(id:any,filterObject?:any):Observable<any>{
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
    return this.httpClient.get(`${this.baseUrl}/ventasucursalpdf/${id}${queryString}`,{responseType:'blob'}).pipe(
      map((body: any) => {
        return body;
      },)
    );
  }

  getVentasBobinas(filterObject?:any):Observable<any>{
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
    return this.httpClient.get(`${this.baseUrl}/ventabobinas${queryString}`).pipe(
      map((body: any) => {
        return body;
      },)
    );
  }
  
  getVentasBobinasPDF(filterObject?:any):Observable<any>{
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
    return this.httpClient.get(`${this.baseUrl}/ventabobinaspdf${queryString}`,{responseType:'blob'}).pipe(
      map((body: any) => {
        return body;
      },)
    );
  }

  getPagos(filterObject?:any):Observable<any>{
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
    return this.httpClient.get(`${this.baseUrl}/pagos${queryString}`).pipe(
      map((body: any) => {
        return body;
      },)
    );
  }
  
  getPagosPDF(filterObject?:any):Observable<any>{
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
    return this.httpClient.get(`${this.baseUrl}/pagospdf${queryString}`,{responseType:'blob'}).pipe(
      map((body: any) => {
        return body;
      },)
    );
  }

  

  reporteLotesDetalle(id:any){
    return this.httpClient.get(this.baseUrl+'/lotesdetalle/'+id);
  }


  getMovimientos(filterObject?:any):Observable<any>{
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
    return this.httpClient.get(`${this.baseUrl}/movimientos${queryString}`).pipe(
      map((body: any) => {
        return body;
      },)
    );
  }
  
  getMovimientosPDF(filterObject?:any):Observable<any>{
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
    return this.httpClient.get(`${this.baseUrl}/movimientospdf${queryString}`,{responseType:'blob'}).pipe(
      map((body: any) => {
        return body;
      },)
    );
  }
  

}

