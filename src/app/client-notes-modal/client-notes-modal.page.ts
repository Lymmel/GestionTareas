import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { Client } from '../interfaces/client';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client-notes-modal',
  templateUrl: './client-notes-modal.page.html',
  styleUrls: ['./client-notes-modal.page.scss'],
})
export class ClientNotesModalPage implements OnInit {

  //Lo que le pasas al modal.
  @Input() codigocliente: string;
  @Input() myData: Client;


  notes: Client[] = [];
  
  constructor(private cliSvc: ClientService, private modalCtrl: ModalController, navParams: NavParams, private formBuilder: FormBuilder, private nav: NavController) { 
    this.codigocliente = navParams.get('codigocliente');
    this.myData = navParams.get('Client');
  }

  ngOnInit() {
    this.cliSvc.getNotasCliente(this.codigocliente)
      .subscribe(notes => {
        console.log(notes);
        
        this.notes = notes;
      });
  }

  //Cierra el modal
  close() {
    this.modalCtrl.dismiss();
  }

}
