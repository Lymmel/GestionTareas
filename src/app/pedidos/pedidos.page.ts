import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { PedidosService } from '../services/pedidos.service';
import { Pedido } from '../interfaces/pedidos';
import { LoadingComponent } from '../components/loading/loading.component';
import { AddpedidosModalPage } from '../addpedidos-modal/addpedidos-modal.page';
import { PedidosdetailsModalPage } from '../pedidosdetails-modal/pedidosdetails-modal.page';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  title = 'proxy';
  pedidos: Pedido[] = [];
  pedbackup: Pedido[] = [];

  constructor(private pedSvc: PedidosService, private menuCtrl: MenuController, private myLoading: LoadingComponent, private modalCtrl: ModalController) {
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


  async filterList(evt) {
    this.pedidos = this.pedbackup;
    const searchTerm = evt.srcElement.value;

    if (searchTerm && searchTerm.trim() != '') {
      this.pedidos = this.pedidos.filter(currentClient => {
        if (currentClient.numeropedido && searchTerm) {
          return (currentClient.numeropedido.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
        }
      });
    } else {
      this.ngOnInit();
    }

  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: AddpedidosModalPage,
      cssClass: 'addpedidos-modal',
    });
    return await modal.present();
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }


  async presentModal2(numeropedido:string, myData:Pedido) {
    const modal = await this.modalCtrl.create({
      component: PedidosdetailsModalPage,
      componentProps:{
        'numeropedido': numeropedido,
        'Pedido': myData
      }
    });
    return await modal.present();
  }

}


