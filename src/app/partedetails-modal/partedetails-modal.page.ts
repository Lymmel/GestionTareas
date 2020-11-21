import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { Parte } from '../interfaces/partes';

@Component({
  selector: 'app-partedetails-modal',
  templateUrl: './partedetails-modal.page.html',
  styleUrls: ['./partedetails-modal.page.scss'],
})
export class PartedetailsModalPage implements OnInit {

  //Lo que le pasas al modal
  @Input() idparte: string;
  @Input() myData: Parte;
  public parteForm2: FormGroup;


  partes: Parte[] = [];

  constructor(private modalCtrl: ModalController, navParams: NavParams, private formBuilder: FormBuilder, private nav: NavController) {
    this.idparte = navParams.get('idparte');
    this.myData = navParams.get('Parte');
  }



  ngOnInit() {
    this.parteForm2 = this.formBuilder.group({
      descripcion: [this.myData.descripcion, Validators.required],
      observaciones: [this.myData.observaciones],
      observacionescliente: [this.myData.observacionescliente],
      numhoras: [this.myData.numhoras],
      numhorasfactura: [this.myData.numhorasfactura],
      estadoparte: [this.myData.estadoparte]
    });

  }




  close() {
    this.modalCtrl.dismiss();
  }

}
