import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { ContractdetailsModalPageRoutingModule } from './contractdetails-modal-routing.module';

import { ContractdetailsModalPage } from './contractdetails-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ContractdetailsModalPageRoutingModule
  ],
  declarations: [ContractdetailsModalPage]
})
export class ContractdetailsModalPageModule {}
