import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { LoadingComponent } from '../components/loading/loading.component';
import { ToastComponent } from '../components/toast/toast.component';
import { Parte } from '../interfaces/partes';
import { Tarea } from '../interfaces/tareas';
import { Trabajo } from '../interfaces/trabajo';
import { PartesService } from '../services/partes.service';
import { TareasService } from '../services/tareas.service';

@Component({
  selector: 'app-parte-edit-modal',
  templateUrl: './parte-edit-modal.page.html',
  styleUrls: ['./parte-edit-modal.page.scss'],
})
export class ParteEditModalPage implements OnInit {

  //Lo que le pasas al modal
  @Input() idparte: string;
  @Input() myData: Parte;

  public parteFormEdit: FormGroup;
  trabajos: Trabajo[] = [];

  constructor(private formBuilder: FormBuilder, private parteSvc: PartesService,
    private myLoading: LoadingComponent, public myToast: ToastComponent, private nav: NavController, private modalCtrl: ModalController,
    navParams: NavParams) {
    this.idparte = navParams.get('idparte');
    this.myData = navParams.get('Parte');
  }

  ngOnInit() {

    //Cargamos el formulario con los datos pasados desde TareasDetailsPage (dónde se ubica "PartesPage").
    this.parteFormEdit = this.formBuilder.group({
      descripcion: [this.myData.descripcion],
      numhoras: [this.myData.numhoras],
      numhorasfactura: [this.myData.numhorasfactura],
      idtrabajo: [this.myData.idtrabajo],
      observaciones: [this.myData.observaciones],
      fecha: [this.myData.fecha]

    });
    this.parteSvc.getWorks()
      .subscribe(trabajos => {
        console.log(trabajos);
        this.trabajos = trabajos;
      });
  }


  /*
    Método que edita el parte.
    Al modificar los datos del formulario, este los recoge y se los pasa al método updatePart llamado desde el Servicio.
    De esta manera el parte quedará editado.
  */
  editParte() {
    let data: Parte;
    data = {
      idparte: this.myData.idparte,
      descripcion: this.parteFormEdit.get('descripcion').value,
      numhoras: this.parteFormEdit.get('numhoras').value,
      numhorasfactura: this.parteFormEdit.get('numhorasfactura').value,
      idtrabajo: this.parteFormEdit.get('idtrabajo').value,
      observaciones: this.parteFormEdit.get('observaciones').value,
      fecha: this.parteFormEdit.get('fecha').value
    }
    try {
      this.parteSvc.updatePart(data).subscribe((done) => {
        this.parteFormEdit.reset();
        this.myToast.presentToast("Parte editado", 'success');
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
