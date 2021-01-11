import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContratoEditModalPageRoutingModule } from './contrato-edit-modal-routing.module';

import { ContratoEditModalPage } from './contrato-edit-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ContratoEditModalPageRoutingModule
  ],
  declarations: [ContratoEditModalPage]
})
export class ContratoEditModalPageModule {}
