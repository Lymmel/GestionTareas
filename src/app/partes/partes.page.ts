import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { AddpartesModalPage } from '../addpartes-modal/addpartes-modal.page';
import { AlertComponent } from '../components/alert/alert.component';
import { LoadingComponent } from '../components/loading/loading.component';
import { ToastComponent } from '../components/toast/toast.component';
import { Parte } from '../interfaces/partes';
import { PartedetailsModalPage } from '../partedetails-modal/partedetails-modal.page';
import { PartesService } from '../services/partes.service';

@Component({
  selector: 'app-partes',
  templateUrl: './partes.page.html',
  styleUrls: ['./partes.page.scss'],
})
export class PartesPage implements OnInit {

  title = 'proxy';
  partes: Parte[] = [];
  partbackup: Parte[] = [];

  constructor(private partSvc: PartesService, private menuCtrl: MenuController, private myLoading: LoadingComponent, private modalCtrl: ModalController,
    private myAlert: AlertComponent, private myToast: ToastComponent) {
    this.menuCtrl.enable(false, 'firstMenu');
  }



  ngOnInit() {
    this.partSvc.getAll()
      .subscribe(partes => {
        console.log(partes);
        this.partes = partes;
      });

    this.partSvc.getAll()
      .subscribe(partbackup => {
        console.log(partbackup);
        this.partbackup = partbackup;
      });
  }


  /*
  Método para refrescar los datos manualmente deslizando el dedo de arriba a abajo
  Vuelve a cargar el array de partes.
  Llamando de nuevo al método getAll desde el Servicio.
  */
  public doRefresh(e: any) {
    this.myLoading.presentLoading();
    this.partes = [];
    console.log("Cargando partes...");
    this.partSvc.getAll().subscribe((listado) => {
      this.partes = listado;
      this.myLoading.hideLoading();

      e.target.complete()
    },
      error => {

        e.target.complete()
      });
  }

  /*
  Método para refrescar los datos, en este caso lo usaremos desde un botón
  Carga de nuevo el array de partes.
  */
  private async refrescar() {
    await this.myLoading.presentLoading();
    this.partes = [];
    console.log("Cargando partes...");
    try {
      this.partSvc.getAll().subscribe((listado) => {
        if (listado) {
          this.partes = listado;
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
    Método que filtra el array por ID de parte
  */
  async filterList(evt) {
    this.partes = this.partbackup;
    const searchTerm = evt.srcElement.value;

    if (searchTerm && searchTerm.trim() != '') {
      this.partes = this.partes.filter(currentClient => {
        if (currentClient.idparte && searchTerm) {
          return (currentClient.idparte.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
        }
      });
    } else {
      this.ngOnInit();
    }
  }

  /*
  Método que abre el modal page de añadir nuevo parte.
  */
  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: AddpartesModalPage,
      cssClass: 'addpartes-modal',
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
  Método que abre el modal page de detalles avanzados del parte.
  Le pasa al modal page, el id del parte y un objeto parte
  */
  async presentModal2(idparte: string, myData: Parte) {
    const modal = await this.modalCtrl.create({
      component: PartedetailsModalPage,
      componentProps: {
        'idparte': idparte,
        'Parte': myData
      }
    });
    return await modal.present();
  }


  /*
  Método al cual se le pasa un Parte como parámetro
  Presenta un mensage de alerta, en caso de darle a si, llama al método deletePart desde el Servicio, y borra el parte.
  */
  borraParte(parte: Parte) {
    this.myAlert.presentAlert().then((success: boolean) => {
      try {
        if (success) {
          console.log(parte);
          this.partSvc.deletePart(parte).subscribe((salida) => {
            this.myToast.presentToast("Parte borrado correctamente", 'success');
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