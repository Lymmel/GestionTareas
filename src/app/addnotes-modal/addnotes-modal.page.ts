import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { LoadingComponent } from '../components/loading/loading.component';
import { ToastComponent } from '../components/toast/toast.component';
import { Note } from '../interfaces/note';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-addnotes-modal',
  templateUrl: './addnotes-modal.page.html',
  styleUrls: ['./addnotes-modal.page.scss'],
})
export class AddnotesModalPage implements OnInit {

  //Lo que le pasas al modal.
  @Input() myData2: Note;

  public noteForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private cliSvc: ClientService,
    private myLoading: LoadingComponent, public myToast: ToastComponent, private modalCtrl: ModalController, navParams: NavParams) {
    this.myData2 = navParams.get('Note');
  }


  ngOnInit() {
    this.noteForm = this.formBuilder.group({
      codigocliente: [''],
      titulonota: [''],
      descripcionnota: [''],
      codigoempresa: [''],
    });

    console.log(this.myData2);


  }


  /*
  Método que obtiene los valores del formulario a rellenar.
  Los guarda en una variable llamada data.
  Pasa esa variable de tipo note al método createNote, llamado desde el Servicio, y lo añade.
  */
  addNote() {
    let data: Note;
    data = {
      codigocliente: this.noteForm.get('codigocliente').value,
      titulonota: this.noteForm.get('titulonota').value,
      descripcionnota: this.noteForm.get('descripcionnota').value,
      codigoempresa: this.noteForm.get('codigoempresa').value,
    }
    this.myLoading.presentLoading();

    try {
      this.cliSvc.createNote(data).subscribe((ok) => {
        this.noteForm.reset();
        this.myToast.presentToast("Nota agregada", 'success');
        this.myLoading.hideLoading();
      })
    } catch (error) {
      this.myToast.presentToast("Error", 'danger', 4000);
    }
    this.myLoading.hideLoading();
  }


  //Cierra el modal.
  close() {
    this.modalCtrl.dismiss();
  }

}
