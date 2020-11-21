import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { AddtareasModalPage } from '../addtareas-modal/addtareas-modal.page';
import { AlertComponent } from '../components/alert/alert.component';
import { LoadingComponent } from '../components/loading/loading.component';
import { ToastComponent } from '../components/toast/toast.component';
import { Tarea } from '../interfaces/tareas';
import { TareasService } from '../services/tareas.service';
import { TareadetailsModalPage } from '../tareadetails-modal/tareadetails-modal.page';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {

  title = 'proxy';
  tareas: Tarea[] = [];
  tarbackup: Tarea[] = [];

  constructor(private tarSvc: TareasService, private menuCtrl:MenuController, private myLoading: LoadingComponent,
    private modalCtrl:ModalController, private myAlert: AlertComponent, private myToast: ToastComponent) {
    this.menuCtrl.enable(false, 'firstMenu');
  }



  ngOnInit(){
    this.tarSvc.getAll()
    .subscribe(tareas => {
      console.log(tareas);
      this.tareas = tareas;
    });

    this.tarSvc.getAll()
      .subscribe(tarbackup => {
        console.log(tarbackup);
        this.tarbackup = tarbackup;
      });
  }


  public doRefresh(e: any) {
    this.myLoading.presentLoading();
    this.tareas = [];
    console.log("Cargando tareas...");
    this.tarSvc.getAll().subscribe((listado) => {
      this.tareas = listado;
      this.myLoading.hideLoading();

      e.target.complete()
    },
      error => {

        e.target.complete()
      });
  }


  private async refrescar() {
    await this.myLoading.presentLoading();
    this.tareas = [];
    console.log("Cargando tareas...");
    try {
      this.tarSvc.getAll().subscribe((listado) => {
        if(listado){
          this.tareas = listado;
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
    this.tareas = this.tarbackup;
    const searchTerm = evt.srcElement.value;

    if (searchTerm && searchTerm.trim() != ''){
      this.tareas = this.tareas.filter(currentClient => {
        if (currentClient.idtarea && searchTerm) {
          return (currentClient.idtarea.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
        }
      });
    }else{
      this.ngOnInit();
    }
  }


  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: AddtareasModalPage,
      cssClass: 'addtareas-modal',
    });
    return await modal.present();
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  async presentModal2(idtareas:string, myData:Tarea) {
    const modal = await this.modalCtrl.create({
      component: TareadetailsModalPage,
      componentProps:{
        'idtareas': idtareas,
        'Tarea': myData
      }
    });
    return await modal.present();
  }


  borraTarea(tarea: Tarea) {
    this.myAlert.presentAlert().then((success: boolean) => {
      try {
        if (success) {
          console.log(tarea);
          this.tarSvc.deleteTar(tarea).subscribe((salida) => {
            this.myToast.presentToast("Tarea borrada correctamente", 'success');
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
