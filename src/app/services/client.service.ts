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



  getAll(): Observable<any> {
    //return this.http.get<any>('https://apittask.tandemsoftware.es/api/clientes/7F9231ED2F71CF139B9442935);
     return this.http.get<any>('/api/clientes/7F9231ED2F71CF139B9442935');

  }

  //obtener 1 cliente by id.
  public getClientById(id: number) {
    const path = `api/cliente/7F9231ED2F71CF139B9442935/${id}`;
    return this.http.get<Client>(path);
  }

  //crear cliente
  createClient(task: Client): Observable<any> {
    /*
    const path = `${this.api}/cliente`;
    return this.http.post<Client>(path, task);
    */
   return this.http.post<any>('api/clientes/7F9231ED2F71CF139B9442935', task);
  }

  //actualizar datos cliente
  updateTask(client: Client) {                
    const path = `${this.api}/cliente/${client.codigocliente}`;
    return this.http.put<Client>(path, client);
  }

  //borrar cliente
  deleteTask(id: string) {
    const path = `${this.api}/cliente/${id}`;
    return this.http.delete(path);
  }
  

}


