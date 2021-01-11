import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parte } from '../interfaces/partes';
import { Tarea } from '../interfaces/tareas';

@Injectable({
  providedIn: 'root'
})
export class PartesService {

  private api = 'https://apittask.tandemsoftware.es/api';
  constructor(private http: HttpClient) {
  }


  //Obtiene todos los partes desde la API
  getAll(): Observable<any> {
    //return this.http.get<any>('https://apittask.tandemsoftware.es/api/partes/7F9231ED2F71CF139B9442935);
    return this.http.get<any>('/api/partes/7F9231ED2F71CF139B9442935');
  }

  //Obtenemos los partes de una tarea
  getPartToTask(idtarea: string): Observable<any> {
    return this.http.get<any>('/api/partestarea/7F9231ED2F71CF139B9442935' + '/' + idtarea);
  }

  //obtenemos los trabajos
  getWorks(): Observable<any> {
    return this.http.get<any>('/api/trabajos/7F9231ED2F71CF139B9442935');
  }


  /*
  getByID(id: string): Observable<any> {
     return this.http.get<any>('/api/partes/7F9231ED2F71CF139B9442935'+'/'+id);
  }
  */

  //crear parte
  createPart(parte: Parte): Observable<any> {
    return this.http.post<any>('/api/creaparte', parte);
  }

  //deleteparte
  deletePart(parte: Parte): Observable<any> {
    console.log(parte);
    return this.http.post<any>('/api/deletepartepedido', parte);
  }

  //actualiza parte
  updatePart(parte: Parte): Observable<any> {
    return this.http.post<any>('/api/updateparte', parte);
  }

}
