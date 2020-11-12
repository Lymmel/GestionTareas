import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { PedidosdetailsModalPageRoutingModule } from './pedidosdetails-modal-routing.module';

import { PedidosdetailsModalPage } from './pedidosdetails-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PedidosdetailsModalPageRoutingModule
  ],
  declarations: [PedidosdetailsModalPage]
})
export class PedidosdetailsModalPageModule {}
