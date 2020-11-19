import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parte } from '../interfaces/partes';

@Injectable({
  providedIn: 'root'
})
export class PartesService {

  private api = 'https://apittask.tandemsoftware.es/api';
  constructor(private http: HttpClient) {
  }



  getAll(): Observable<any> {
    //return this.http.get<any>('https://apittask.tandemsoftware.es/api/partes/7F9231ED2F71CF139B9442935);
     return this.http.get<any>('/api/partes/7F9231ED2F71CF139B9442935');
  }

  getByID(id: string): Observable<any> {
     return this.http.get<any>('/api/partes/7F9231ED2F71CF139B9442935'+'/'+id);
  }

  //crear parte
  createPart(parte: Parte): Observable<any> {
   return this.http.post<any>('/api/creaparte', parte);
  }

  //deleteparte
  deletePart(parte: Parte):Observable<any>{
    console.log(parte);
    return this.http.post<any>('/api/deletepartepedido',parte);
  }

  //deleteparte2
  deletePart2(idparte: String):Observable<any>{
    console.log(idparte);
    return this.http.delete<any>('/api/deletepartepedido2');
  }

  
}
