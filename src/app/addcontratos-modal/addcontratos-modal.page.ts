import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { LoadingComponent } from '../components/loading/loading.component';
import { ToastComponent } from '../components/toast/toast.component';
import { Contrato } from '../interfaces/contratos';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContratosService } from '../services/contratos.service';
import { ClientService } from '../services/client.service';
import { Client } from '../interfaces/client';

@Component({
  selector: 'app-addcontratos-modal',
  templateUrl: './addcontratos-modal.page.html',
  styleUrls: ['./addcontratos-modal.page.scss'],
})
export class AddcontratosModalPage implements OnInit {

  public contractForm: FormGroup;
  clients: Client[] = [];
  clibackup: Client[] = [];

  constructor(private formBuilder: FormBuilder, private contSvc: ContratosService,
    private myLoading: LoadingComponent, public myToast: ToastComponent, private modalCtrl: ModalController, private cliSvc: ClientService) {
  }

  ngOnInit() {
    this.contractForm = this.formBuilder.group({
      ejerciciocontrato: ['', Validators.required],
      seriecontrato: [''],
      fechacontrato: [''],
      numerocontrato: [''],
      codigocliente: ['']
    });

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
  Método que obtiene los valores del formulario a rellenar.
  Los guarda en una variable llamada data.
  Pasa esa variable de tipo contrato al método createContract, llamado desde el Servicio, y lo añade.
  */
  addContrato() {
    let data: Contrato;
    data = {
      ejerciciocontrato: this.contractForm.get('ejerciciocontrato').value,
      seriecontrato: this.contractForm.get('seriecontrato').value,
      fechacontrato: this.contractForm.get('fechacontrato').value,
      numerocontrato: this.contractForm.get('numerocontrato').value,
      codigocliente: this.contractForm.get('codigocliente').value
    }
    this.myLoading.presentLoading();

    try {
      this.contSvc.createContract(data).subscribe((ok) => {
        this.contractForm.reset();
        this.myToast.presentToast("Contrato agregado", 'success');
        this.myLoading.hideLoading();
      })
    } catch (error) {
      this.myToast.presentToast("Error", 'danger', 4000);

    }
    this.myLoading.hideLoading();
  }

  //Cierra del modal.
  close() {
    this.modalCtrl.dismiss();
  }

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

}
