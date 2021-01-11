import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddpartesModalPageRoutingModule } from './addpartes-modal-routing.module';

import { AddpartesModalPage } from './addpartes-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddpartesModalPageRoutingModule
  ],
  declarations: [AddpartesModalPage]
})
export class AddpartesModalPageModule {}
