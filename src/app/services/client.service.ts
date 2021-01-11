import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Client } from './../interfaces/client';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientService {


  private api = 'https://apittask.tandemsoftware.es/api';
  constructor(private http: HttpClient) {
  }


  //Obtiene todos los clientes desde la API
  getAll(): Observable<any> {
    //return this.http.get<any>('https://apittask.tandemsoftware.es/api/clientes/7F9231ED2F71CF139B9442935);
    return this.http.get<any>('/api/clientes/7F9231ED2F71CF139B9442935/9');

  }

  //obtener 1 cliente por id.
  public getClientById(id: number) {
    const path = `api/cliente/7F9231ED2F71CF139B9442935/${id}`;
    return this.http.get<Client>(path);
  }

  //crear cliente
  createClient(client: Client): Observable<any> {
    return this.http.post<any>('api/createclient', client);
  }


  //borrar cliente
  deleteClient(cliente: Client): Observable<any> {
    console.log(cliente);
    return this.http.post<any>('/api/deletecliente', cliente);
  }


  //actualiza cliente
  updateClient(cli: Client): Observable<any> {
    return this.http.post<any>('/api/updatecliente', cli);
  }




  //Notas del Cliente

  //Obtiene las notas de un cliente
  getNotasCliente(codigocliente: string): Observable<any> {
    return this.http.get<any>('/api/notascliente/7F9231ED2F71CF139B9442935' + '/' + codigocliente + '/9');

  }





}


