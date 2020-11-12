import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { AddproyectosModalPage } from '../addproyectos-modal/addproyectos-modal.page';
import { LoadingComponent } from '../components/loading/loading.component';
import { Proyecto } from '../interfaces/proyectos';
import { ProjectdetailsModalPage } from '../projectdetails-modal/projectdetails-modal.page';
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

  constructor(private proyServc: ProyectosService, private menuCtrl:MenuController, private myLoading: LoadingComponent,
    private modalCtrl:ModalController) {
    this.menuCtrl.enable(false, 'firstMenu');
  }



  ngOnInit(){
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


  private async refrescar() {
    await this.myLoading.presentLoading();
    this.proyectos = [];
    console.log("Cargando proyectos...");
    try {
      this.proyServc.getAll().subscribe((listado) => {
        if(listado){
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

  async filterList(evt) {
    this.proyectos = this.proybackup;
    const searchTerm = evt.srcElement.value;

    if (searchTerm && searchTerm.trim() != ''){
      this.proyectos = this.proyectos.filter(currentClient => {
        if (currentClient.codigoproyecto && searchTerm) {
          return (currentClient.codigoproyecto.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
        }
      });
    }else{
      this.ngOnInit();
    }
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: AddproyectosModalPage,
      cssClass: 'addproyectos-modal',
    });
    return await modal.present();
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  async presentModal2(codigoproyecto:string, myData:Proyecto) {
    const modal = await this.modalCtrl.create({
      component: ProjectdetailsModalPage,
      componentProps:{
        'codigoproyecto': codigoproyecto,
        'Proyecto': myData
      }
    });
    return await modal.present();
  }

}
