import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { AddcontratosModalPage } from '../addcontratos-modal/addcontratos-modal.page';
import { AlertComponent } from '../components/alert/alert.component';
import { ToastComponent } from '../components/toast/toast.component';
import { ContractdetailsModalPage } from '../contractdetails-modal/contractdetails-modal.page';
import { ContratoEditModalPage } from '../contrato-edit-modal/contrato-edit-modal.page';
import { Contrato } from '../interfaces/contratos';
import { ContratosService } from '../services/contratos.service';
import { LoadingComponent } from './../components/loading/loading.component';


@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.page.html',
  styleUrls: ['./contratos.page.scss'],
})
export class ContratosPage implements OnInit {

  title = 'proxy';
  contratos: Contrato[] = [];
  contbackup: Contrato[] = [];

  constructor(private contSvc: ContratosService, private menuCtrl: MenuController, private myLoading: LoadingComponent,
    private modalCtrl: ModalController, private myAlert: AlertComponent, private myToast: ToastComponent) {
    this.menuCtrl.enable(false, 'firstMenu');
  }



  ngOnInit() {
    this.contSvc.getAll()
      .subscribe(contratos => {
        console.log(contratos);
        this.contratos = contratos;
      });

    this.contSvc.getAll()
      .subscribe(contbackup => {
        console.log(contbackup);
        this.contbackup = contbackup;
      });
  }

  /*
  Método para refrescar los datos manualmente deslizando el dedo de arriba a abajo
  Vuelve a cargar el array de contratos.
  Llamando de nuevo al método getAll desde el Servicio.
  */
  public doRefresh(e: any) {
    this.myLoading.presentLoading();
    this.contratos = [];
    console.log("Cargando contratos...");
    this.contSvc.getAll().subscribe((listado) => {
      this.contratos = listado;
      this.myLoading.hideLoading();

      e.target.complete()
    },
      error => {

        e.target.complete()
      });
  }

  /*
   Método para refrescar los datos, en este caso lo usaremos desde un botón
   Carga de nuevo el array de contratos.
  */
  private async refrescar() {
    await this.myLoading.presentLoading();
    this.contratos = [];
    console.log("Cargando contratos...");
    try {
      this.contSvc.getAll().subscribe((listado) => {
        if (listado) {
          this.contratos = listado;
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
    Método que filtra el array por ID del contrato
  */
  async filterList(evt) {
    this.contratos = this.contbackup;
    const searchTerm = evt.srcElement.value;

    if (searchTerm && searchTerm.trim() != '') {
      this.contratos = this.contratos.filter(currentContract => {
        if (currentContract.idcontrato && searchTerm) {
          return (currentContract.idcontrato.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
        }
      });
    } else {
      this.ngOnInit();
    }

  }

  /*
  Método que abre el modal page de añadir nuevo contrato.
  */
  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: AddcontratosModalPage,
      cssClass: 'addcontratos-modal',
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
  Método que abre el modal page de detalles avanzados del contrato.
  Le pasa al modal page, el id del contrato y un objeto contrato
  */
  async presentModal2(numerocontrato: string, myData: Contrato) {
    const modal = await this.modalCtrl.create({
      component: ContractdetailsModalPage,
      componentProps: {
        'numerocontrato': numerocontrato,
        'Contrato': myData
      }
    });
    return await modal.present();
  }

  /*
  Método que abre el modal page para editar el contrato.
  Le pasa al modal page, el id del contrato y un objeto contrato.
  */
  async presentModalEdit(idcontrato: string, myData: Contrato) {
    const modal = await this.modalCtrl.create({
      component: ContratoEditModalPage,
      componentProps: {
        'idcontrato': idcontrato,
        'Contrato': myData
      }
    });
    return await modal.present();
  }

  /*
  Método al cual se le pasa un Contrato como parámetro
  Presenta un mensage de alerta, en caso de darle a si, llama al método deleteContrato desde el Servicio, y borra el contrato.
  */
  borraContrato(contr: Contrato) {
    this.myAlert.presentAlert().then((success: boolean) => {
      try {
        if (success) {
          console.log(contr);
          this.contSvc.deleteContrato(contr).subscribe((salida) => {
            this.myToast.presentToast("Contrato borrado correctamente", 'success');
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