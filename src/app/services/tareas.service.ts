import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarea } from '../interfaces/tareas';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private api = 'https://apittask.tandemsoftware.es/api';
  constructor(private http: HttpClient) {
  }


  //Obtenemos todas las tareas desde la API
  getAll(): Observable<any> {
    //return this.http.get<any>('https://apittask.tandemsoftware.es/api/tareas/7F9231ED2F71CF139B9442935);
    return this.http.get<any>('/api/tareas/7F9231ED2F71CF139B9442935');

  }


  //crear tarea
  createTar(task: Tarea): Observable<any> {
    return this.http.post<any>('api/createtarea', task);
  }

  //borra tarea
  deleteTar(tarea: Tarea): Observable<any> {
    console.log(tarea);
    return this.http.post<any>('/api/deletetarea', tarea);
  }

  //actualiza tarea
  updateTar(tarea: Tarea): Observable<any> {
    return this.http.post<any>('/api/updatetarea', tarea);
  }

}








