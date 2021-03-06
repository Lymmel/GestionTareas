import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { Contrato } from '../interfaces/contratos';

@Component({
  selector: 'app-contractdetails-modal',
  templateUrl: './contractdetails-modal.page.html',
  styleUrls: ['./contractdetails-modal.page.scss'],
})
export class ContractdetailsModalPage implements OnInit {

  //Lo que le pasas al modal.
  @Input() numerocontrato: string;
  @Input() myData: Contrato;

  public contractForm2: FormGroup;

  contratos: Contrato[] = [];

  constructor(private modalCtrl: ModalController, navParams: NavParams, private formBuilder: FormBuilder, private nav: NavController) {
    this.numerocontrato = navParams.get('numerocontrato');
    this.myData = navParams.get('Contrato');
  }


  //Rellenamos el formulario con los datos pasados desde ContratosPage.
  ngOnInit() {
    this.contractForm2 = this.formBuilder.group({
      numerocontrato: [this.myData.numerocontrato],
      ejerciciocontrato: [this.myData.ejerciciocontrato],
      codigocliente: [this.myData.codigocliente],
      seriecontrato: [this.myData.seriecontrato],
      fechacontrato: [this.myData.fechacontrato]
    });

  }



  //Cierra el modal
  close() {
    this.modalCtrl.dismiss();
  }

}
