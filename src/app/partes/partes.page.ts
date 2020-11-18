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

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: AddpartesModalPage,
      cssClass: 'addpartes-modal',
    });
    return await modal.present();
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }


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


  borraParte(idparte: string) {
    this.myAlert.presentAlert().then((success: boolean) => {
      try {
        if (success) {
          console.log(idparte);
          this.partSvc.deletePart(idparte).subscribe((salida) => {
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
