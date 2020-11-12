import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { AddproyectosModalPageRoutingModule } from './addproyectos-modal-routing.module';

import { AddproyectosModalPage } from './addproyectos-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddproyectosModalPageRoutingModule
  ],
  declarations: [AddproyectosModalPage]
})
export class AddproyectosModalPageModule {}
