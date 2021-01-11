import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { LoadingComponent } from '../components/loading/loading.component';
import { ToastComponent } from '../components/toast/toast.component';
import { Client } from '../interfaces/client';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-cliente-edit-modal',
  templateUrl: './cliente-edit-modal.page.html',
  styleUrls: ['./cliente-edit-modal.page.scss'],
})
export class ClienteEditModalPage implements OnInit {

  //Lo que le pasas al modal
  @Input() idcliente: string;
  @Input() myData: Client;

  public clientFormEdit: FormGroup;

  constructor(private formBuilder: FormBuilder, private Clisvc: ClientService,
    private myLoading: LoadingComponent, public myToast: ToastComponent, private nav: NavController, private modalCtrl: ModalController,
    navParams: NavParams) {
    this.idcliente = navParams.get('idcliente');
    this.myData = navParams.get('Cliente');
  }

  ngOnInit() {

    //Cargamos el formulario con los datos pasados desde ClientPage
    this.clientFormEdit = this.formBuilder.group({
      codigocliente: [this.myData.codigocliente],
      razonsocial: [this.myData.razonsocial],
      email: [this.myData.email],
      telefono: [this.myData.telefono],
      direccion: [this.myData.direccion],
      municipio: [this.myData.municipio],
      provincia: [this.myData.provincia],

    });
  }


  /*
    Método que edita el cliente.
    Al modificar los datos del formulario, este los recoge y se los pasa al método updateClient llamado desde el Servicio.
    De esta manera el cliente quedará editado.
  */
  editClient() {
    let data: Client;
    data = {
      idcliente: this.myData.idcliente,
      codigocliente: this.clientFormEdit.get('codigocliente').value,
      razonsocial: this.clientFormEdit.get('razonsocial').value,
      email: this.clientFormEdit.get('email').value,
      telefono: this.clientFormEdit.get('telefono').value,
      direccion: this.clientFormEdit.get('direccion').value,
      municipio: this.clientFormEdit.get('municipio').value,
      provincia: this.clientFormEdit.get('provincia').value,
    }
    try {
      this.Clisvc.updateClient(data).subscribe((done) => {
        this.clientFormEdit.reset();
        this.myToast.presentToast("Cliente editado", 'success');
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
