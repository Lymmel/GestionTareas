import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams, NavController } from '@ionic/angular';
import { LoadingComponent } from '../components/loading/loading.component';
import { ToastComponent } from '../components/toast/toast.component';
import { Parte } from '../interfaces/partes';
import { Tarea } from '../interfaces/tareas';
import { Trabajo } from '../interfaces/trabajo';
import { PartesService } from '../services/partes.service';

@Component({
  selector: 'app-addpartes-modal',
  templateUrl: './addpartes-modal.page.html',
  styleUrls: ['./addpartes-modal.page.scss'],
})
export class AddpartesModalPage implements OnInit {

  //Lo que le pasas al modal
  @Input() idtareas2: string;
  @Input() myData2: Tarea;
  public partForm: FormGroup;

  trabajos: Trabajo[] = [];

  constructor(private formBuilder: FormBuilder, private partSvc: PartesService,
    private myLoading: LoadingComponent, public myToast: ToastComponent, private modalCtrl: ModalController, navParams: NavParams) {
    this.idtareas2 = navParams.get('idtareas');
    this.myData2 = navParams.get('Tarea');
  }

  ngOnInit() {
    this.partForm = this.formBuilder.group({
      descripcion: [''],
      observaciones: [''],
      idtrabajo: [''],
      idtarea: [this.myData2.idtarea],
      fecha: [''],
      numhoras: [''],
      numhorasfactura: ['']
    });

    this.partSvc.getWorks()
    .subscribe(trabajos => {
      console.log(trabajos);
      this.trabajos = trabajos;
    });

  }


  /*
  Método que obtiene los valores del formulario a rellenar.
  Los guarda en una variable llamada data.
  Pasa esa variable de tipo parte al método createPart, llamado desde el Servicio, y lo añade.
  */
  addParte() {
    let data: Parte;
    data = {
      descripcion: this.partForm.get('descripcion').value,
      observaciones: this.partForm.get('observaciones').value,
      idtrabajo: this.partForm.get('idtrabajo').value,
      idtarea: this.partForm.get('idtarea').value,
      fecha: this.partForm.get('fecha').value,
      numhoras: this.partForm.get('numhoras').value,
      numhorasfactura: this.partForm.get('numhorasfactura').value,

    }
    this.myLoading.presentLoading();

    try {
      this.partSvc.createPart(data).subscribe((ok) => {
        this.partForm.reset();
        this.myToast.presentToast("Parte agregado", 'success');
        this.myLoading.hideLoading();
      })
    } catch (error) {
      this.myToast.presentToast("Error", 'danger', 4000);
    }
  }

  //cierra el modal
  close() {
    this.modalCtrl.dismiss();
  }
}
