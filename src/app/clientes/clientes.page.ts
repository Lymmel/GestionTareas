import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Client } from '../interfaces/client';
import { ClientService } from './../services/client.service';
import { LoadingComponent } from './../components/loading/loading.component';
import { Router } from '@angular/router';
import { AddclientModalPage } from '../addclient-modal/addclient-modal.page';
import { ClientdetailsModalPage } from '../clientdetails-modal/clientdetails-modal.page';
import { ToastComponent } from '../components/toast/toast.component';
import { AlertComponent } from '../components/alert/alert.component';
import { ClienteEditModalPage } from '../cliente-edit-modal/cliente-edit-modal.page';
import { ClientNotesModalPage } from '../client-notes-modal/client-notes-modal.page';



@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  private searchedItem: any;

  title = 'proxy';
  clients: Client[] = [];
  //folder: string;
  clibackup: Client[] = [];



  constructor(private cliSvc: ClientService, private menuCtrl: MenuController, private myLoading: LoadingComponent,
    private router: Router, private modalCtrl: ModalController,
    private myAlert: AlertComponent, private myToast: ToastComponent) {
    this.menuCtrl.enable(false, 'firstMenu');
  }


  /*
  public itemVisible: boolean = false;
  mostrarItem() {
    this.itemVisible =!this.itemVisible;
  }
  */


  ngOnInit() {
    this.cliSvc.getAll()
      .subscribe(clients => {
        console.log(clients);
        this.clients = clients;
      });

    this.cliSvc.getAll()
      .subscribe(clibackup => {
        console.log(clibackup);
        this.clibackup = clibackup;
      });
  }


  /*
  Método para refrescar los datos manualmente deslizando el dedo de arriba a abajo
  Vuelve a cargar el array de clientes.
  Llamando de nuevo al método getAll desde el Servicio.
  */
  public doRefresh(e: any) {
    this.myLoading.presentLoading();
    this.clients = [];
    console.log("Cargando clientes...");
    this.cliSvc.getAll().subscribe((listado) => {
      this.clients = listado;
      this.myLoading.hideLoading();

      e.target.complete()
    },
      error => {

        e.target.complete()
      });
  }


  /*
  Método para refrescar los datos, en este caso lo usaremos desde un botón
  Carga de nuevo el array de clientes.
  */
  private async refrescar() {
    await this.myLoading.presentLoading();
    this.clients = [];
    console.log("Cargando clientes...");
    try {
      this.cliSvc.getAll().subscribe((listado) => {
        if (listado) {
          this.clients = listado;
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
    Método que filtra el array por ID del cliente
  */
  async filterList(evt) {
    this.clients = this.clibackup;
    const searchTerm = evt.srcElement.value;

    if (searchTerm && searchTerm.trim() != '') {
      this.clients = this.clients.filter(currentClient => {
        if (currentClient.idcliente && searchTerm) {
          return (currentClient.idcliente.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
          // return this.cliSvc.getClientById(currentClient.codigocliente.lastIndexOf(searchTerm));
        }
      });
    } else {
      this.ngOnInit();
    }

  }


  /*
  Método que abre el modal page de añadir nuevo cliente.
  */
  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: AddclientModalPage,
      cssClass: 'addclient-modal',
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
  Método que abre el modal page de detalles avanzados del cliente.
  Y le pasa al modal page, el código del cliente y un objeto cliente.
  */
  async presentModal2(codigocliente: string, myData: Client) {
    const modal = await this.modalCtrl.create({
      component: ClientdetailsModalPage,
      componentProps: {
        'codigocliente': codigocliente,
        'Client': myData
      }
    });
    return await modal.present();
  }


  /*
  Método que abre el modal page para editar el cliente.
  Le pasa al modal page, el id del cliente y un objeto cliente.
  */
  async presentModalEdit(idcliente: string, myData: Client) {
    const modal = await this.modalCtrl.create({
      component: ClienteEditModalPage,
      componentProps: {
        'idcliente': idcliente,
        'Cliente': myData
      }
    });
    return await modal.present();
  }


  async presentModalNotes(codigocliente: string, myData: Client) {
    const modal = await this.modalCtrl.create({
      component: ClientNotesModalPage,
      componentProps: {
        'codigocliente': codigocliente,
        'Cliente': myData
      }
    });
    return await modal.present();
  }


  /*
  Método al cual se le pasa un Cliente como parámetro
  Presenta un mensage de alerta, en caso de darle a si, llama al método deleteClient desde el Servicio, y borra el cliente.
  */
  borraCliente(cli: Client) {
    this.myAlert.presentAlert().then((success: boolean) => {
      try {
        if (success) {
          console.log(cli);
          this.cliSvc.deleteClient(cli).subscribe((salida) => {
            this.myToast.presentToast("Cliente borrado correctamente", 'success');
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
