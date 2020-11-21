import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contrato } from '../interfaces/contratos';

@Injectable({
  providedIn: 'root'
})
export class ContratosService {

  private api = 'https://apittask.tandemsoftware.es/api';
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    //return this.http.get<any>('https://apittask.tandemsoftware.es/api/contratos/7F9231ED2F71CF139B9442935);
     return this.http.get<any>('/api/contratos/7F9231ED2F71CF139B9442935');

  }

  //crear contrato
  createContract(task: Contrato): Observable<any> {
    /*
    const path = `${this.api}/cliente`;
    return this.http.post<Client>(path, task);
    */
   return this.http.post<any>('api/contratos/7F9231ED2F71CF139B9442935', task);
  }
}
