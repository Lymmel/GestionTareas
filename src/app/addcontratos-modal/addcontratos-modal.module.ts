import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AddcontratosModalPageRoutingModule } from './addcontratos-modal-routing.module';

import { AddcontratosModalPage } from './addcontratos-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddcontratosModalPageRoutingModule
  ],
  declarations: [AddcontratosModalPage]
})
export class AddcontratosModalPageModule {}
