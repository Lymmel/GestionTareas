import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { PedidosService } from '../services/pedidos.service';
import { Pedido } from '../interfaces/pedidos';
import { LoadingComponent } from '../components/loading/loading.component';
import { AddpedidosModalPage } from '../addpedidos-modal/addpedidos-modal.page';
import { PedidosdetailsModalPage } from '../pedidosdetails-modal/pedidosdetails-modal.page';
import { AlertComponent } from '../components/alert/alert.component';
import { ToastComponent } from '../components/toast/toast.component';
import { PedidoEditModalPage } from '../pedido-edit-modal/pedido-edit-modal.page';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  title = 'proxy';
  pedidos: Pedido[] = [];
  pedbackup: Pedido[] = [];

  constructor(private pedSvc: PedidosService, private menuCtrl: MenuController, private myLoading: LoadingComponent, private modalCtrl: ModalController,
    private myAlert: AlertComponent, private myToast: ToastComponent) {
    this.menuCtrl.enable(false, 'firstMenu');
  }



  ngOnInit() {
    this.pedSvc.getAll()
      .subscribe(pedidos => {
        console.log(pedidos);
        this.pedidos = pedidos;
      });
    this.pedSvc.getAll()
      .subscribe(pedbackup => {
        console.log(pedbackup);
        this.pedbackup = pedbackup;
      });
  }


  /*
  Método para refrescar los datos manualmente deslizando el dedo de arriba a abajo
  Vuelve a cargar el array de pedidos.
  Llamando de nuevo al método getAll desde el Servicio.
  */
  public doRefresh(e: any) {
    this.myLoading.presentLoading();
    this.pedidos = [];
    console.log("Cargando pedidos...");
    this.pedSvc.getAll().subscribe((listado) => {
      this.pedidos = listado;
      this.myLoading.hideLoading();

      e.target.complete()
    },
      error => {

        e.target.complete()
      });
  }

  /*
  Método para refrescar los datos, en este caso lo usaremos desde un botón
  Carga de nuevo el array de pedidos.
  */
  private async refrescar() {
    await this.myLoading.presentLoading();
    this.pedidos = [];
    console.log("Cargando pedidos...");
    try {
      this.pedSvc.getAll().subscribe((listado) => {
        if (listado) {
          this.pedidos = listado;
          this.myLoading.hideLoading();
        }

      },
        error => {

        });
    } catch (err) {
      this.myLoading.hideLoading();
    }
    console.log("Solicitada la petición");
  }

  /*
    Método que filtra el array por id del pedido
  */
  async filterList(evt) {
    this.pedidos = this.pedbackup;
    const searchTerm = evt.srcElement.value;

    if (searchTerm && searchTerm.trim() != '') {
      this.pedidos = this.pedidos.filter(currentClient => {
        if (currentClient.idpedido && searchTerm) {
          return (currentClient.idpedido.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
        }
      });
    } else {
      this.ngOnInit();
    }

  }

  /*
  Método que abre el modal page de añadir nuevo pedido.
  */
  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: AddpedidosModalPage,
      cssClass: 'addpedidos-modal',
    });
    return await modal.present();
  }

  //Cierra el modal
  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  /*
  Método que abre el modal page de detalles avanzados del pedido.
  Le pasa al modal page, el id del pedido y un objeto pedido.
  */
  async presentModal2(numeropedido: string, myData: Pedido) {
    const modal = await this.modalCtrl.create({
      component: PedidosdetailsModalPage,
      componentProps: {
        'numeropedido': numeropedido,
        'Pedido': myData
      }
    });
    return await modal.present();
  }


  /*
  Método que abre el modal page para editar el pedido.
  Le pasa al modal page, el id del pedido y un objeto pedido.
  */
  async presentModalEdit(idpedido: string, myData: Pedido) {
    const modal = await this.modalCtrl.create({
      component: PedidoEditModalPage,
      componentProps: {
        'idpedido': idpedido,
        'Pedido': myData
      }
    });
    return await modal.present();
  }


  /*
  Método al cual se le pasa un Pedido como parámetro
  Presenta un mensage de alerta, en caso de darle a si, llama al método deletePedido desde el Servicio, y borra el pedido.
  */
  borraPedido(ped: Pedido) {
    this.myAlert.presentAlert().then((success: boolean) => {
      try {
        if (success) {
          console.log(ped);
          this.pedSvc.deletePedido(ped).subscribe((salida) => {
            this.myToast.presentToast("Pedido borrado correctamente", 'success');
            this.refrescar();
          });
        }
      } catch (error) {
        console.log(error);
      }
    }).catch((error) => {
      console.log(error);
      this.myToast.presentToast("Error", 'danger', 4000);
    })
  }

}


