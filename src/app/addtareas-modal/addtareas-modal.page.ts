import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { LoadingComponent } from '../components/loading/loading.component';
import { ToastComponent } from '../components/toast/toast.component';
import { Proyecto } from '../interfaces/proyectos';
import { Tarea } from '../interfaces/tareas';
import { ProyectosService } from '../services/proyectos.service';
import { TareasService } from '../services/tareas.service';

@Component({
  selector: 'app-addtareas-modal',
  templateUrl: './addtareas-modal.page.html',
  styleUrls: ['./addtareas-modal.page.scss'],
})
export class AddtareasModalPage implements OnInit {

  public tarForm: FormGroup;
  proyectos: Proyecto[] = [];

  constructor(private formBuilder: FormBuilder, private tarSvc: TareasService,
    private myLoading: LoadingComponent, public myToast: ToastComponent, private modalCtrl: ModalController,
    private proyServc: ProyectosService) {
  }


  ngOnInit() {
    this.tarForm = this.formBuilder.group({
      idproyecto: [''],
      descripcion: [''],
      fechafin: [''],
      fecha: [''],
      documento: [''],
    });
    this.proyServc.getAll()
    .subscribe(proyectos => {
      console.log(proyectos);
      this.proyectos = proyectos;
    });
  }

  addTarea() {
    let data: Tarea;
    data = {
      idproyecto: this.tarForm.get('idproyecto').value,
      descripcion: this.tarForm.get('descripcion').value,
      fechafin: this.tarForm.get('fechafin').value,
      fecha: this.tarForm.get('fecha').value,
      documento: this.tarForm.get('documento').value,
    }
    this.myLoading.presentLoading();

    try {
      this.tarSvc.createTar(data).subscribe((ok) => {
        this.tarForm.reset();
        this.myToast.presentToast("Tarea agregada", 'success');
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
