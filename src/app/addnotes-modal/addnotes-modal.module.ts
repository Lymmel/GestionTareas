import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddnotesModalPageRoutingModule } from './addnotes-modal-routing.module';

import { AddnotesModalPage } from './addnotes-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddnotesModalPageRoutingModule
  ],
  declarations: [AddnotesModalPage]
})
export class AddnotesModalPageModule {}
