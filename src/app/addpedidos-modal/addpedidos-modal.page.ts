import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { LoadingComponent } from '../components/loading/loading.component';
import { ToastComponent } from '../components/toast/toast.component';
import { Client } from '../interfaces/client';
import { Pedido } from '../interfaces/pedidos';
import { ClientService } from '../services/client.service';
import { PedidosService } from '../services/pedidos.service';

@Component({
  selector: 'app-addpedidos-modal',
  templateUrl: './addpedidos-modal.page.html',
  styleUrls: ['./addpedidos-modal.page.scss'],
})
export class AddpedidosModalPage implements OnInit {

  public pedidoForm: FormGroup;
  clients: Client[] = [];

  constructor(private formBuilder: FormBuilder, private pedSvc: PedidosService,
    private myLoading: LoadingComponent, public myToast: ToastComponent, private modalCtrl: ModalController, private cliSvc: ClientService) {
  }

  ngOnInit() {
    this.pedidoForm = this.formBuilder.group({
      ejerciciopedido: [''],
      fechapedido: [''],
      seriepedido: [''],
      horasestimadas: [''],
      codigocliente: [''],
      numeropedido: ['', Validators.required]
    });

    this.cliSvc.getAll()
      .subscribe(clients => {
        console.log(clients);
        this.clients = clients;
      });
  }


  /*
  Método que obtiene los valores del formulario a rellenar.
  Los guarda en una variable llamada data.
  Pasa esa variable de tipo pedido al método createPedido, llamado desde el Servicio, y lo añade.
  */
  addPedido() {
    let data: Pedido;
    data = {
      ejerciciopedido: this.pedidoForm.get('ejerciciopedido').value,
      fechapedido: this.pedidoForm.get('fechapedido').value,
      seriepedido: this.pedidoForm.get('seriepedido').value,
      horasestimadas: this.pedidoForm.get('horasestimadas').value,
      codigocliente: this.pedidoForm.get('codigocliente').value,
      numeropedido: this.pedidoForm.get('numeropedido').value
    }
    this.myLoading.presentLoading();

    try {
      this.pedSvc.createPedido(data).subscribe((ok) => {
        this.pedidoForm.reset();
        this.myToast.presentToast("Cliente agregado", 'success');
        this.myLoading.hideLoading();
      })
    } catch (error) {
      this.myToast.presentToast("Error", 'danger', 4000);

    } 
    this.myLoading.hideLoading();
  }




  //Cierra el modal
  close() {
    this.modalCtrl.dismiss();
  }

}
