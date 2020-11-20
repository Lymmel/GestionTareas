import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingComponent } from '../components/loading/loading.component';
import { ToastComponent } from '../components/toast/toast.component';
import { Client } from '../interfaces/client';
import { ClientService } from '../services/client.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-addclient-modal',
  templateUrl: './addclient-modal.page.html',
  styleUrls: ['./addclient-modal.page.scss'],
})
export class AddclientModalPage implements OnInit {

  public clientForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private cliSvc: ClientService,
    private myLoading: LoadingComponent, public myToast: ToastComponent, private modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.clientForm = this.formBuilder.group({
      codigocliente: ['', Validators.required],
      razonsocial: [''],
      email: [''],
      telefono: [''],
      direccion: [''],
      municipio: [''],
      provincia: [''],
      activo: ['']
    });
  }

  addClient() {
    let data: Client;
    data = {
      codigocliente: this.clientForm.get('codigocliente').value,
      razonsocial: this.clientForm.get('razonsocial').value,
      email: this.clientForm.get('email').value,
      telefono: this.clientForm.get('telefono').value,
      direccion: this.clientForm.get('direccion').value,
      municipio: this.clientForm.get('municipio').value,
      provincia: this.clientForm.get('provincia').value,
      activo: this.clientForm.get('activo').value,
    }
    this.myLoading.presentLoading();

    try {
      this.cliSvc.createClient(data).subscribe((ok) => {
        this.clientForm.reset();
        this.myToast.presentToast("Cliente agregado", 'success');
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
