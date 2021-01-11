import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParteEditModalPageRoutingModule } from './parte-edit-modal-routing.module';

import { ParteEditModalPage } from './parte-edit-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ParteEditModalPageRoutingModule
  ],
  declarations: [ParteEditModalPage]
})
export class ParteEditModalPageModule {}
