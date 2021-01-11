import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { Pedido } from '../interfaces/pedidos';

@Component({
  selector: 'app-pedidosdetails-modal',
  templateUrl: './pedidosdetails-modal.page.html',
  styleUrls: ['./pedidosdetails-modal.page.scss'],
})
export class PedidosdetailsModalPage implements OnInit {

  //Lo que le pasas al modal
  @Input() numeropedido: string;
  @Input() myData: Pedido;

  public pedForm2: FormGroup;

  pedidos: Pedido[] = [];

  constructor(private modalCtrl: ModalController, navParams: NavParams, private formBuilder: FormBuilder, private nav: NavController) {
    this.numeropedido = navParams.get('numeropedido');
    this.myData = navParams.get('Pedido');
  }


  //Rellenamos el formulario con los datos pasados desde PedidosPage.
  ngOnInit() {
    this.pedForm2 = this.formBuilder.group({
      numeropedido: [this.myData.numeropedido],
      ejerciciopedido: [this.myData.ejerciciopedido],
      fechapedido: [this.myData.fechapedido],
      seriepedido: [this.myData.seriepedido],
      horasestimadas: [this.myData.horasestimadas],
      codigocliente: [this.myData.codigocliente]
    });

  }


  //Cierra el modal.
  close() {
    this.modalCtrl.dismiss();
  }

}
