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

  //Obtener todos los datos desde la API
  getAll(): Observable<any> {
    //return this.http.get<any>('https://apittask.tandemsoftware.es/api/contratos/7F9231ED2F71CF139B9442935);
    return this.http.get<any>('/api/contratos/7F9231ED2F71CF139B9442935/1');

  }

  //crear contrato
  createContract(contrato: Contrato): Observable<any> {
    return this.http.post<any>('/api/createcontrato', contrato);
  }

  //borrar contrato
  deleteContrato(contrato: Contrato): Observable<any> {
    return this.http.post<any>('/api/deletecontrato', contrato);
  }

  //actualiza contrato
  updateContr(contrato: Contrato): Observable<any> {
    return this.http.post<any>('/api/updatecontrato', contrato);
  }



}
