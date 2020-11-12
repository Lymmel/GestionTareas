import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { Proyecto } from '../interfaces/proyectos';

@Component({
  selector: 'app-projectdetails-modal',
  templateUrl: './projectdetails-modal.page.html',
  styleUrls: ['./projectdetails-modal.page.scss'],
})
export class ProjectdetailsModalPage implements OnInit {

  //Lo que le pasas al modal
  @Input() codigoproyecto: string;
  @Input() myData: Proyecto;
  public proyForm2: FormGroup;


  projects: Proyecto[] = [];

  constructor(private modalCtrl: ModalController, navParams: NavParams, private formBuilder: FormBuilder, private nav: NavController) {
    this.codigoproyecto = navParams.get('codigoproyecto');
    this.myData = navParams.get('Proyecto');
  }



  ngOnInit() {
    this.proyForm2 = this.formBuilder.group({
      descripcion: [this.myData.descripcion, Validators.required],
      fechacreacion: [this.myData.fechacreacion],
      fechainicio: [this.myData.fechainicio],
      fechafin: [this.myData.fechafin],
      observaciones: [this.myData.observaciones],
      importe: [this.myData.importe],
      numhoras: [this.myData.numhoras],
      razonsocial: [this.myData.razonsocial]
    });

  }




  close() {
    this.modalCtrl.dismiss();
  }

}
