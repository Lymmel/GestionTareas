import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../interfaces/proyectos';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  private api = 'https://apittask.tandemsoftware.es/api';
  constructor(private http: HttpClient) {
  }


  //Obtenemos todos los proyectos desde la API
  getAll(): Observable<any> {
    //return this.http.get<any>('https://apittask.tandemsoftware.es/api/proyectos/7F9231ED2F71CF139B9442935);
    return this.http.get<any>('/api/proyectos/7F9231ED2F71CF139B9442935');

  }


  //crear proyecto
  createProject(proy: Proyecto): Observable<any> {
    return this.http.post<any>('/api/createproyecto', proy);
  }

  //borrar proyecto
  deleteProyecto(proyecto: Proyecto): Observable<any> {
    return this.http.post<any>('/api/deleteproyecto', proyecto);
  }

  //actualiza tarea
  updateProy(proyecto: Proyecto): Observable<any> {
    return this.http.post<any>('/api/updateproyecto', proyecto);
  }


}
