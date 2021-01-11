import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClienteEditModalPageRoutingModule } from './cliente-edit-modal-routing.module';

import { ClienteEditModalPage } from './cliente-edit-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ClienteEditModalPageRoutingModule
  ],
  declarations: [ClienteEditModalPage]
})
export class ClienteEditModalPageModule {}
