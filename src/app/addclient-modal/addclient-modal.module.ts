import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AddclientModalPageRoutingModule } from './addclient-modal-routing.module';

import { AddclientModalPage } from './addclient-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddclientModalPageRoutingModule
  ],
  declarations: [AddclientModalPage]
})
export class AddclientModalPageModule {}
