import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { LoadingComponent } from '../components/loading/loading.component';
import { ToastComponent } from '../components/toast/toast.component';
import { Parte } from '../interfaces/partes';
import { PartesService } from '../services/partes.service';

@Component({
  selector: 'app-addpartes-modal',
  templateUrl: './addpartes-modal.page.html',
  styleUrls: ['./addpartes-modal.page.scss'],
})
export class AddpartesModalPage implements OnInit {

  public partForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private partSvc: PartesService,
    private myLoading: LoadingComponent, public myToast: ToastComponent, private modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.partForm = this.formBuilder.group({
      descripcion: ['', Validators.required],
      observaciones: [''],
      idtrabajo: [''],
      idtarea: ['']
    });
  }

  addParte() {
    let data: Parte;
    data = {
      descripcion: this.partForm.get('descripcion').value,
      observaciones: this.partForm.get('observaciones').value,
      idtrabajo: this.partForm.get('idtrabajo').value,
      idtarea: this.partForm.get('idtarea').value,

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

  close() {
    this.modalCtrl.dismiss();
  }
}
