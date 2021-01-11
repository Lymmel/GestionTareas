import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { LoadingComponent } from '../components/loading/loading.component';
import { ToastComponent } from '../components/toast/toast.component';
import { Client } from '../interfaces/client';
import { Pedido } from '../interfaces/pedidos';
import { ClientService } from '../services/client.service';
import { PedidosService } from '../services/pedidos.service';

@Component({
  selector: 'app-pedido-edit-modal',
  templateUrl: './pedido-edit-modal.page.html',
  styleUrls: ['./pedido-edit-modal.page.scss'],
})
export class PedidoEditModalPage implements OnInit {

  //Lo que le pasas al modal
  @Input() idpedido: string;
  @Input() myData: Pedido;

  public pedidoFormEdit: FormGroup;
  clients: Client[] = [];

  constructor(private formBuilder: FormBuilder, private pedSvc: PedidosService,
    private myLoading: LoadingComponent, public myToast: ToastComponent, private nav: NavController, private modalCtrl: ModalController,
    navParams: NavParams, private cliSvc: ClientService) {
    this.idpedido = navParams.get('idpedido');
    this.myData = navParams.get('Pedido');
  }

  ngOnInit() {

    //Cargamos el formulario con los datos pasados desde PedidosPage
    this.pedidoFormEdit = this.formBuilder.group({
      numeropedido: [this.myData.numeropedido],
      codigocliente: [this.myData.codigocliente],
      ejerciciopedido: [this.myData.ejerciciopedido],
      seriepedido: [this.myData.seriepedido],
      horasestimadas: [this.myData.horasestimadas],
      fechapedido: [this.myData.fechapedido]

    });
    this.cliSvc.getAll()
      .subscribe(clients => {
        console.log(clients);
        this.clients = clients;
      });
  }



  /*
    Método que edita el pedido.
    Al modificar los datos del formulario, este los recoge y se los pasa al método updatePed llamado desde el Servicio.
    De esta manera el pedido quedará editado.
  */
  editPedido() {
    let data: Pedido
    data = {
      idpedido: this.myData.idpedido,
      numeropedido: this.pedidoFormEdit.get('numeropedido').value,
      codigocliente: this.pedidoFormEdit.get('codigocliente').value,
      ejerciciopedido: this.pedidoFormEdit.get('ejerciciopedido').value,
      seriepedido: this.pedidoFormEdit.get('seriepedido').value,
      horasestimadas: this.pedidoFormEdit.get('horasestimadas').value,
      fechapedido: this.pedidoFormEdit.get('fechapedido').value
    }
    try {
      this.pedSvc.updatePed(data).subscribe((done) => {
        this.pedidoFormEdit.reset();
        this.myToast.presentToast("Pedido editado", 'success');
        this.myLoading.hideLoading();
      })

    } catch (err) {
      console.log(err);
      this.myToast.presentToast("Error", 'danger', 4000);
    }

    this.modalCtrl.dismiss();
  }


  //Cierra el modal
  close() {
    this.modalCtrl.dismiss();
  }




}
