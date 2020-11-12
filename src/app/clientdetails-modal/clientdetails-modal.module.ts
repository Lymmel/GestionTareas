import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientdetailsModalPageRoutingModule } from './clientdetails-modal-routing.module';

import { ClientdetailsModalPage } from './clientdetails-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ClientdetailsModalPageRoutingModule
  ],
  declarations: [ClientdetailsModalPage]
})
export class ClientdetailsModalPageModule {}
