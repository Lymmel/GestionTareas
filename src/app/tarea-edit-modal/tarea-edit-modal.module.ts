import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TareaEditModalPageRoutingModule } from './tarea-edit-modal-routing.module';

import { TareaEditModalPage } from './tarea-edit-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    TareaEditModalPageRoutingModule
  ],
  declarations: [TareaEditModalPage]
})
export class TareaEditModalPageModule {}
