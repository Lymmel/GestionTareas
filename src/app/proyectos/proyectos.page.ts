import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { AddproyectosModalPage } from '../addproyectos-modal/addproyectos-modal.page';
import { AlertComponent } from '../components/alert/alert.component';
import { LoadingComponent } from '../components/loading/loading.component';
import { ToastComponent } from '../components/toast/toast.component';
import { Proyecto } from '../interfaces/proyectos';
import { ProjectdetailsModalPage } from '../projectdetails-modal/projectdetails-modal.page';
import { ProyectoEditModalPage } from '../proyecto-edit-modal/proyecto-edit-modal.page';
import { ProyectosService } from '../services/proyectos.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.page.html',
  styleUrls: ['./proyectos.page.scss'],
})
export class ProyectosPage implements OnInit {

  title = 'proxy';
  proyectos: Proyecto[] = [];
  proybackup: Proyecto[] = [];

  constructor(private proyServc: ProyectosService, private menuCtrl: MenuController, private myLoading: LoadingComponent,
    private modalCtrl: ModalController, private myAlert: AlertComponent, private myToast: ToastComponent) {
    this.menuCtrl.enable(false, 'firstMenu');
  }



  ngOnInit() {
    this.proyServc.getAll()
      .subscribe(proyectos => {
        console.log(proyectos);
        this.proyectos = proyectos;
      });

    this.proyServc.getAll()
      .subscribe(proybackup => {
        console.log(proybackup);
        this.proybackup = proybackup;
      });
  }

  /*
  Método para refrescar los datos manualmente deslizando el dedo de arriba a abajo
  Vuelve a cargar el array de proyectos.
  Llamando de nuevo al método getAll desde el Servicio.
  */
  public doRefresh(e: any) {
    this.myLoading.presentLoading();
    this.proyectos = [];
    console.log("Cargando proyectos...");
    this.proyServc.getAll().subscribe((listado) => {
      this.proyectos = listado;
      this.myLoading.hideLoading();

      e.target.complete()
    },
      error => {

        e.target.complete()
      });
  }

  /*
  Método para refrescar los datos, en este caso lo usaremos desde un botón
  Carga de nuevo el array de proyectos.
  */
  private async refrescar() {
    await this.myLoading.presentLoading();
    this.proyectos = [];
    console.log("Cargando proyectos...");
    try {
      this.proyServc.getAll().subscribe((listado) => {
        if (listado) {
          this.proyectos = listado;
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
    Método que filtra el array por ID de proyecto
  */
  async filterList(evt) {
    this.proyectos = this.proybackup;
    const searchTerm = evt.srcElement.value;

    if (searchTerm && searchTerm.trim() != '') {
      this.proyectos = this.proyectos.filter(currentClient => {
        if (currentClient.idproyecto && searchTerm) {
          return (currentClient.idproyecto.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
        }
      });
    } else {
      this.ngOnInit();
    }
  }

  /*
  Método que abre el modal page de añadir nuevo proyecto.
  */
  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: AddproyectosModalPage,
      cssClass: 'addproyectos-modal',
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
  Método que abre el modal page de detalles avanzados del proyecto.
  Le pasa al modal page, el id del proyecto y un objeto proyecto
  */
  async presentModal2(idproyecto: string, myData: Proyecto) {
    const modal = await this.modalCtrl.create({
      component: ProjectdetailsModalPage,
      componentProps: {
        'idproyecto': idproyecto,
        'Proyecto': myData
      }
    });
    return await modal.present();
  }


  /*
  Método que abre el modal page para editar el proyecto.
  Le pasa al modal page, el id del proyecto y un objeto proyecto.
  */
  async presentModalEdit(idproyecto: string, myData: Proyecto) {
    const modal = await this.modalCtrl.create({
      component: ProyectoEditModalPage,
      componentProps: {
        'idproyecto': idproyecto,
        'Proyecto': myData
      }
    });
    return await modal.present();
  }


  /*
  Método al cual se le pasa un Proyecto como parámetro
  Presenta un mensage de alerta, en caso de darle a si, llama al método deleteProyecto desde el Servicio, y borra el proyecto.
  */
  borraProyecto(proy: Proyecto) {
    this.myAlert.presentAlert().then((success: boolean) => {
      try {
        if (success) {
          console.log(proy);
          this.proyServc.deleteProyecto(proy).subscribe((salida) => {
            this.myToast.presentToast("Proyecto borrado correctamente", 'success');
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

