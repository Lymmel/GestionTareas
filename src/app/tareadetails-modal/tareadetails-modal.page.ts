import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { Tarea } from '../interfaces/tareas';

@Component({
  selector: 'app-tareadetails-modal',
  templateUrl: './tareadetails-modal.page.html',
  styleUrls: ['./tareadetails-modal.page.scss'],
})
export class TareadetailsModalPage implements OnInit {

  //Lo que le pasas al modal
  @Input() idtareas: string;
  @Input() myData: Tarea;
  public tareaForm2: FormGroup;


  tareas: Tarea[] = [];

  constructor(private modalCtrl: ModalController, navParams: NavParams, private formBuilder: FormBuilder, private nav: NavController) {
    this.idtareas = navParams.get('idtareas');
    this.myData = navParams.get('Tarea');
  }



  ngOnInit() {
    this.tareaForm2 = this.formBuilder.group({
      descripcion: [this.myData.descripcion, Validators.required],
      fechafin: [this.myData.fechafin],
      fecha: [this.myData.fecha],
      documento: [this.myData.documento]
    });

  }




  close() {
    this.modalCtrl.dismiss();
  }

}
