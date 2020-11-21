import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { Client } from '../interfaces/client';
import { ClientService } from '../services/client.service';


@Component({
  selector: 'app-clientdetails-modal',
  templateUrl: './clientdetails-modal.page.html',
  styleUrls: ['./clientdetails-modal.page.scss'],
})
export class ClientdetailsModalPage implements OnInit {


  //Lo que le pasas al modal
  @Input() codigocliente: string;
  @Input() myData: Client;
  public clientForm2: FormGroup;


  clients: Client[] = [];

  constructor(private cliSvc: ClientService, private modalCtrl: ModalController, navParams: NavParams, private formBuilder: FormBuilder, private nav: NavController) {
    this.codigocliente = navParams.get('codigocliente');
    this.myData = navParams.get('Client');
  }



  ngOnInit() {
    this.clientForm2 = this.formBuilder.group({
      razonsocial: [this.myData.razonsocial, Validators.required],
      email: [this.myData.email],
      telefono: [this.myData.telefono],
      direccion: [this.myData.direccion],
      municipio: [this.myData.municipio],
      provincia: [this.myData.provincia]
    });

  }




  close() {
    this.modalCtrl.dismiss();
  }

}
