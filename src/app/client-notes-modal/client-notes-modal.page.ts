import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { AddnotesModalPage } from '../addnotes-modal/addnotes-modal.page';
import { Client } from '../interfaces/client';
import { Note } from '../interfaces/note';
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


  notes: Note[] = [];

  constructor(private cliSvc: ClientService, private modalCtrl: ModalController, navParams: NavParams, private formBuilder: FormBuilder, private nav: NavController) {
    this.codigocliente = navParams.get('codigocliente');
    this.myData = navParams.get('Client');
  }

  ngOnInit() {
    this.cliSvc.getNotasCliente(this.codigocliente)
      .subscribe(notes => {

        this.notes = notes;

        console.log(this.notes);
      });
  }


  /*
  Método que abre el modal page de añadir una nueva nota.
  */
  async presentAddNotesModal(myData: Note) {
    const modal = await this.modalCtrl.create({
      component: AddnotesModalPage,
      componentProps: {
        'Note': myData
      }
    });
    return await modal.present();
  }


  //Cierra el modal
  close() {
    this.modalCtrl.dismiss();
  }

}
