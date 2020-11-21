import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AddtareasModalPageRoutingModule } from './addtareas-modal-routing.module';

import { AddtareasModalPage } from './addtareas-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddtareasModalPageRoutingModule
  ],
  declarations: [AddtareasModalPage]
})
export class AddtareasModalPageModule {}
