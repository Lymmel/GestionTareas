import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { LoadingComponent } from '../components/loading/loading.component';
import { ToastComponent } from '../components/toast/toast.component';
import { Parte } from '../interfaces/partes';
import { Tarea } from '../interfaces/tareas';
import { PartesService } from '../services/partes.service';
import { ProyectosService } from '../services/proyectos.service';
import { TareasService } from '../services/tareas.service';

@Component({
  selector: 'app-tarea-edit-modal',
  templateUrl: './tarea-edit-modal.page.html',
  styleUrls: ['./tarea-edit-modal.page.scss'],
})
export class TareaEditModalPage implements OnInit {


  //Lo que le pasas al modal
  @Input() idtareas: string;
  @Input() myData: Tarea;

  public tareaFormEdit: FormGroup;
  partes: Parte[] = [];

  constructor(private formBuilder: FormBuilder, private tarSvc: TareasService,
    private myLoading: LoadingComponent, public myToast: ToastComponent, private nav: NavController, private modalCtrl: ModalController,
    navParams: NavParams, private proyServc: ProyectosService) {
    this.idtareas = navParams.get('idtareas');
    this.myData = navParams.get('Tarea');
  }

  ngOnInit() {

    //Cargamos el formulario con los datos pasados desde TareasDetailsPage
    this.tareaFormEdit = this.formBuilder.group({
      idproyecto: [this.myData.idproyecto],
      descripcion: [this.myData.descripcion],
      fechafin: [this.myData.fechafin],
      fecha: [this.myData.fecha],
      documento: [this.myData.documento]

    });
    this.proyServc.getAll()
      .subscribe(partes => {
        console.log(partes);
        this.partes = partes;
      });

    console.log(this.myData);

    console.log(this.myData.idtarea);

  }


  /*
    Método que edita la tarea.
    Al modificar los datos del formulario, este los recoge y se los pasa al método updateTar llamado desde el Servicio.
    De esta manera la tarea quedará editada.
  */
  editTarea() {
    let data: Tarea;
    data = {
      idtarea: this.myData.idtarea,
      idproyecto: this.tareaFormEdit.get('idproyecto').value,
      descripcion: this.tareaFormEdit.get('descripcion').value,
      fechafin: this.tareaFormEdit.get('fechafin').value,
      fecha: this.tareaFormEdit.get('fecha').value,
      documento: this.tareaFormEdit.get('documento').value
    }
    try {
      this.tarSvc.updateTar(data).subscribe((done) => {
        this.tareaFormEdit.reset();
        this.myToast.presentToast("Tarea editada", 'success');
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