import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { LoadingComponent } from '../components/loading/loading.component';
import { ToastComponent } from '../components/toast/toast.component';
import { Client } from '../interfaces/client';
import { Contrato } from '../interfaces/contratos';
import { ClientService } from '../services/client.service';
import { ContratosService } from '../services/contratos.service';

@Component({
  selector: 'app-contrato-edit-modal',
  templateUrl: './contrato-edit-modal.page.html',
  styleUrls: ['./contrato-edit-modal.page.scss'],
})
export class ContratoEditModalPage implements OnInit {

  //Lo que le pasas al modal
  @Input() idcontrato: string;
  @Input() myData: Contrato;

  public contratoFormEdit: FormGroup;
  clients: Client[] = [];

  constructor(private formBuilder: FormBuilder, private contSvc: ContratosService,
    private myLoading: LoadingComponent, public myToast: ToastComponent, private nav: NavController, private modalCtrl: ModalController,
    navParams: NavParams, private cliSvc: ClientService) {
    this.idcontrato = navParams.get('idcontrato');
    this.myData = navParams.get('Contrato');
  }

  ngOnInit() {
    //Cargamos el formulario con los datos pasados desde TareasPage
    this.contratoFormEdit = this.formBuilder.group({
      numerocontrato: [this.myData.numerocontrato],
      codigocliente: [this.myData.codigocliente],
      ejerciciocontrato: [this.myData.ejerciciocontrato],
      seriecontrato: [this.myData.seriecontrato],
      fechacontrato: [this.myData.fechacontrato]

    });
    this.cliSvc.getAll()
      .subscribe(clientes => {
        console.log(clientes);
        this.clients = clientes;
      });
  }

  /*
      Método que edita el contrato.
      Al modificar los datos del formulario, este los recoge y se los pasa al método updateContr llamado desde el Servicio.
      De esta manera el contrato quedará editado.
  */
  editContrato() {
    let data: Contrato;
    data = {
      idcontrato: this.myData.idcontrato,
      numerocontrato: this.contratoFormEdit.get('numerocontrato').value,
      codigocliente: this.contratoFormEdit.get('codigocliente').value,
      ejerciciocontrato: this.contratoFormEdit.get('ejerciciocontrato').value,
      seriecontrato: this.contratoFormEdit.get('seriecontrato').value,
      fechacontrato: this.contratoFormEdit.get('fechacontrato').value
    }
    try {
      this.contSvc.updateContr(data).subscribe((done) => {
        this.contratoFormEdit.reset();
        this.myToast.presentToast("Contrato editado", 'success');
        this.myLoading.hideLoading();
      })

    } catch (err) {
      console.log(err);
      this.myToast.presentToast("Error", 'danger', 4000);
    }

    this.modalCtrl.dismiss();
  }


  //Cierra el modal
  close() {
    this.modalCtrl.dismiss();
  }



}
