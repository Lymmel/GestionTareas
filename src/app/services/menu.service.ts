import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Componente } from '../interfaces/componente';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { 

  }

  getMenuOpts(){
    return this.http.get<Componente[]>('/assets/data/menu.json');
  }
}

