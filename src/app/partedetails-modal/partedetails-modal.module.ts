import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { PartedetailsModalPageRoutingModule } from './partedetails-modal-routing.module';

import { PartedetailsModalPage } from './partedetails-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PartedetailsModalPageRoutingModule
  ],
  declarations: [PartedetailsModalPage]
})
export class PartedetailsModalPageModule {}
