import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { LoadingComponent } from '../components/loading/loading.component';
import { ToastComponent } from '../components/toast/toast.component';
import { Client } from '../interfaces/client';
import { Proyecto } from '../interfaces/proyectos';
import { ClientService } from '../services/client.service';
import { ProyectosService } from '../services/proyectos.service';

@Component({
  selector: 'app-proyecto-edit-modal',
  templateUrl: './proyecto-edit-modal.page.html',
  styleUrls: ['./proyecto-edit-modal.page.scss'],
})
export class ProyectoEditModalPage implements OnInit {

  //Lo que le pasas al modal
  @Input() idproyecto: string;
  @Input() myData: Proyecto;

  public proyectoFormEdit: FormGroup;
  clients: Client[] = [];

  constructor(private formBuilder: FormBuilder, private proySvc: ProyectosService,
    private myLoading: LoadingComponent, public myToast: ToastComponent, private nav: NavController, private modalCtrl: ModalController,
    navParams: NavParams, private cliSvc: ClientService) {
    this.idproyecto = navParams.get('idproyecto');
    this.myData = navParams.get('Proyecto');
  }

  ngOnInit() {

    //Cargamos el formulario con los datos pasados desde ProyectoPage
    this.proyectoFormEdit = this.formBuilder.group({
      descripcion: [this.myData.descripcion],
      observaciones: [this.myData.observaciones],
      importe: [this.myData.importe],
      horasestimadas: [this.myData.horasestimadas],
      codigocliente: [this.myData.codigocliente],
      fechainicio: [this.myData.fechainicio]

    });
    this.cliSvc.getAll()
      .subscribe(clients => {
        console.log(clients);
        this.clients = clients;
      });
  }

  /*
    Método que edita el proyecto.
    Al modificar los datos del formulario, este los recoge y se los pasa al método updateProy llamado desde el Servicio.
    De esta manera el proyecto quedará editado.
  */
  editProyecto() {
    let data: Proyecto;
    data = {
      idproyecto: this.myData.idproyecto,
      descripcion: this.proyectoFormEdit.get('descripcion').value,
      observaciones: this.proyectoFormEdit.get('observaciones').value,
      importe: this.proyectoFormEdit.get('importe').value,
      horasestimadas: this.proyectoFormEdit.get('horasestimadas').value,
      codigocliente: this.proyectoFormEdit.get('codigocliente').value,
      fechainicio: this.proyectoFormEdit.get('fechainicio').value
    }
    try {
      this.proySvc.updateProy(data).subscribe((done) => {
        this.proyectoFormEdit.reset();
        this.myToast.presentToast("Proyecto editado", 'success');
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
