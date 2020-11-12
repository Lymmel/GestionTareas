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



  getAll(): Observable<any> {
    //return this.http.get<any>('https://apittask.tandemsoftware.es/api/proyectos/7F9231ED2F71CF139B9442935);
     return this.http.get<any>('/api/proyectos/7F9231ED2F71CF139B9442935');

  }

  //crear proyecto
  createProject(task: Proyecto): Observable<any> {

   return this.http.post<any>('api/proyectos/7F9231ED2F71CF139B9442935', task);
  }
}
