import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { LoadingComponent } from '../components/loading/loading.component';
import { ToastComponent } from '../components/toast/toast.component';
import { Tarea } from '../interfaces/tareas';
import { TareasService } from '../services/tareas.service';

@Component({
  selector: 'app-addtareas-modal',
  templateUrl: './addtareas-modal.page.html',
  styleUrls: ['./addtareas-modal.page.scss'],
})
export class AddtareasModalPage implements OnInit {

  public tarForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private tarSvc: TareasService,
    private myLoading: LoadingComponent, public myToast: ToastComponent, private modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.tarForm = this.formBuilder.group({
      descripcion: ['', Validators.required],
      fechafin: [''],
      fechaverifica: [''],
      documento: [''],
      municipio: [''],
      provincia: ['']
    });
  }

  addClient() {
    let data: Tarea;
    data = {
      descripcion: this.tarForm.get('descripcion').value,
      fechafin: this.tarForm.get('fechafin').value,
      fechaverifica: this.tarForm.get('fechaverifica').value,
      documento: this.tarForm.get('documento').value,
    }
    this.myLoading.presentLoading();

    try {
      this.tarSvc.createTask(data).subscribe((ok) => {
        this.tarForm.reset();
        this.myToast.presentToast("Tarea agregada", 'success');
      })
    } catch (error) {
      this.myToast.presentToast("Error", 'danger', 4000);
      
    } finally {
      this.myLoading.hideLoading();
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
