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
  @Input() idproyecto: string;
  @Input() myData: Proyecto;

  public proyForm2: FormGroup;

  projects: Proyecto[] = [];

  constructor(private modalCtrl: ModalController, navParams: NavParams, private formBuilder: FormBuilder, private nav: NavController) {
    this.idproyecto = navParams.get('idproyecto');
    this.myData = navParams.get('Proyecto');
  }


  //Rellenamos el formulario con los datos pasados desde ProyectosPage.
  ngOnInit() {
    this.proyForm2 = this.formBuilder.group({
      descripcion: [this.myData.descripcion],
      observaciones: [this.myData.observaciones],
      importe: [this.myData.importe],
      horasestimadas: [this.myData.horasestimadas],
      idproyecto: [this.myData.idproyecto],
      codigocliente: [this.myData.codigocliente],
      fechainicio: [this.myData.fechainicio]
    });

  }

  //Cierra el modal
  close() {
    this.modalCtrl.dismiss();
  }

}
