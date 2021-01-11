import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProyectoEditModalPageRoutingModule } from './proyecto-edit-modal-routing.module';

import { ProyectoEditModalPage } from './proyecto-edit-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ProyectoEditModalPageRoutingModule
  ],
  declarations: [ProyectoEditModalPage]
})
export class ProyectoEditModalPageModule {}
