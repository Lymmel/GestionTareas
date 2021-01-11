import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { LoadingComponent } from '../components/loading/loading.component';
import { ToastComponent } from '../components/toast/toast.component';
import { Client } from '../interfaces/client';
import { Proyecto } from '../interfaces/proyectos';
import { ClientService } from '../services/client.service';
import { ProyectosService } from '../services/proyectos.service';

@Component({
  selector: 'app-addproyectos-modal',
  templateUrl: './addproyectos-modal.page.html',
  styleUrls: ['./addproyectos-modal.page.scss'],
})
export class AddproyectosModalPage implements OnInit {

  public proyForm: FormGroup;
  clients: Client[] = [];

  constructor(private formBuilder: FormBuilder, private proySvc: ProyectosService,
    private myLoading: LoadingComponent, public myToast: ToastComponent, private modalCtrl: ModalController, private cliSvc: ClientService) {
  }

  ngOnInit() {
    this.proyForm = this.formBuilder.group({
      codigocliente: [''],
      descripcion: ['', Validators.required],
      observaciones: [''],
      importe: [''],
      horasestimadas: ['']
    });

    this.cliSvc.getAll()
      .subscribe(clients => {
        console.log(clients);
        this.clients = clients;
      });
  }


  /*
  Método que obtiene los valores del formulario a rellenar.
  Los guarda en una variable llamada data.
  Pasa esa variable de tipo proyecto al método createProject, llamado desde el Servicio, y lo añade.
  */
  addProject() {
    let data: Proyecto;
    data = {
      codigocliente: this.proyForm.get('codigocliente').value,
      descripcion: this.proyForm.get('descripcion').value,
      observaciones: this.proyForm.get('observaciones').value,
      importe: this.proyForm.get('importe').value,
      horasestimadas: this.proyForm.get('horasestimadas').value
    }
    this.myLoading.presentLoading();

    try {
      this.proySvc.createProject(data).subscribe((ok) => {
        this.proyForm.reset();
        this.myToast.presentToast("Proyecto agregado", 'success');
        this.myLoading.hideLoading();
      })
    } catch (error) {
      this.myToast.presentToast("Error", 'danger', 4000);
      
    } 
    this.myLoading.hideLoading();
  }

  close() {
    this.modalCtrl.dismiss();
  }

}
