import { HttpClient } from '@angular/common/http';
import { MethodCall } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { Pedido } from '../interfaces/pedidos';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private api = 'https://apittask.tandemsoftware.es/api';
  constructor(private http: HttpClient) {
  }


  //Obtenemos todos los pedido desde la API
  getAll(): Observable<any> {
    //return this.http.get<any>('https://apittask.tandemsoftware.es/api/pedidos/7F9231ED2F71CF139B9442935);
     return this.http.get<any>('/api/pedidos/7F9231ED2F71CF139B9442935/1');

  }

  //crear pedido
  createPedido(pedido: Pedido): Observable<any> {
   return this.http.post<any>('/api/createpedido', pedido);
  }

  //borrar pedido
  deletePedido(pedido: Pedido): Observable<any> {
    return this.http.post<any>('/api/deletepedido', pedido);
  }

  //actualiza tarea
  updatePed(pedido: Pedido): Observable<any> {
    return this.http.post<any>('/api/updatepedido', pedido);
  }

} 
