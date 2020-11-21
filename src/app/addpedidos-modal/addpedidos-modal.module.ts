import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddpedidosModalPageRoutingModule } from './addpedidos-modal-routing.module';

import { AddpedidosModalPage } from './addpedidos-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddpedidosModalPageRoutingModule
  ],
  declarations: [AddpedidosModalPage]
})
export class AddpedidosModalPageModule {}
