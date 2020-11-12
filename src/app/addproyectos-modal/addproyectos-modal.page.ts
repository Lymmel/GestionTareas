import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { LoadingComponent } from '../components/loading/loading.component';
import { ToastComponent } from '../components/toast/toast.component';
import { Proyecto } from '../interfaces/proyectos';
import { ProyectosService } from '../services/proyectos.service';

@Component({
  selector: 'app-addproyectos-modal',
  templateUrl: './addproyectos-modal.page.html',
  styleUrls: ['./addproyectos-modal.page.scss'],
})
export class AddproyectosModalPage implements OnInit {

  public proyForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private proySvc: ProyectosService,
    private myLoading: LoadingComponent, public myToast: ToastComponent, private modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.proyForm = this.formBuilder.group({
      descripcion: ['', Validators.required],
      fechacreacion: [''],
      fechainicio: [''],
      fechafin: [''],
      observaciones: [''],
      importe: [''],
      numhoras: [''],
      razonsocial: ['']
    });
  }

  addClient() {
    let data: Proyecto;
    data = {
      descripcion: this.proyForm.get('descripcion').value,
      fechacreacion: this.proyForm.get('fechacreacion').value,
      fechainicio: this.proyForm.get('fechainicio').value,
      fechafin: this.proyForm.get('fechafin').value,
      observaciones: this.proyForm.get('observaciones').value,
      importe: this.proyForm.get('importe').value,
      numhoras: this.proyForm.get('numhoras').value,
      razonsocial: this.proyForm.get('razonsocial').value,
    }
    this.myLoading.presentLoading();

    try {
      this.proySvc.createProject(data).subscribe((ok) => {
        this.proyForm.reset();
        this.myToast.presentToast("Proyecto agregado", 'success');
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
