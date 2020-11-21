import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { AddcontratosModalPage } from '../addcontratos-modal/addcontratos-modal.page';
import { ContractdetailsModalPage } from '../contractdetails-modal/contractdetails-modal.page';
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

  constructor(private contSvc: ContratosService, private menuCtrl:MenuController, private myLoading:LoadingComponent,
    private modalCtrl:ModalController) {
    this.menuCtrl.enable(false, 'firstMenu');
  }



  ngOnInit(){
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


  private async refrescar() {
    await this.myLoading.presentLoading();
    this.contratos = [];
    console.log("Cargando contratos...");
    try {
      this.contSvc.getAll().subscribe((listado) => {
        if(listado){
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


  async filterList(evt) {
    this.contratos = this.contbackup;
    const searchTerm = evt.srcElement.value;

    if (searchTerm && searchTerm.trim() != ''){
      this.contratos = this.contratos.filter(currentContract => {
        if (currentContract.numerocontrato && searchTerm) {
          return (currentContract.numerocontrato.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
        }
      });
    }else{
      this.ngOnInit();
    }
    
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: AddcontratosModalPage,
      cssClass: 'addcontratos-modal',
    });
    return await modal.present();
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }


  async presentModal2(numerocontrato:string, myData:Contrato) {
    const modal = await this.modalCtrl.create({
      component: ContractdetailsModalPage,
      componentProps:{
        'numerocontrato': numerocontrato,
        'Contrato': myData
      }
    });
    return await modal.present();
  }


}