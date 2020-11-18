import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Client } from '../interfaces/client';
import { ClientService } from './../services/client.service';
import { LoadingComponent } from './../components/loading/loading.component';
import { Router } from '@angular/router';
import { AddclientModalPage } from '../addclient-modal/addclient-modal.page';
import { ClientdetailsModalPage } from '../clientdetails-modal/clientdetails-modal.page';



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
    private router: Router, private modalCtrl: ModalController) {
    this.menuCtrl.enable(false, 'firstMenu');
  }


  public itemVisible: boolean = false;
  mostrarItem() {
    this.itemVisible =!this.itemVisible;
  }

 

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
   _ionChange(event) {
     const val = event.target.value;
     if (val && val.trim() != '') {
       this.searchedItem.getInputElement.then(item => console.log(item));
     }
   }
 */

  async filterList(evt) {
    this.clients = this.clibackup;
    const searchTerm = evt.srcElement.value;

    if (searchTerm && searchTerm.trim() != '') {
      this.clients = this.clients.filter(currentClient => {
        if (currentClient.codigocliente && searchTerm) {
          return (currentClient.codigocliente.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
          // return this.cliSvc.getClientById(currentClient.codigocliente.lastIndexOf(searchTerm));
        }
      });
    } else {
      this.ngOnInit();
    }

  }

  /*  public irNueva(): void {
    this.router.navigateByUrl('addnewclient');
  }
  */

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: AddclientModalPage,
      cssClass: 'addclient-modal',
    });
    return await modal.present();
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }


  async presentModal2(codigocliente:string, myData:Client) {
    const modal = await this.modalCtrl.create({
      component: ClientdetailsModalPage,
      componentProps:{
        'codigocliente': codigocliente,
        'Client': myData
      }
    });
    return await modal.present();
  }


}


