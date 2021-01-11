import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidoEditModalPageRoutingModule } from './pedido-edit-modal-routing.module';

import { PedidoEditModalPage } from './pedido-edit-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PedidoEditModalPageRoutingModule
  ],
  declarations: [PedidoEditModalPage]
})
export class PedidoEditModalPageModule {}
