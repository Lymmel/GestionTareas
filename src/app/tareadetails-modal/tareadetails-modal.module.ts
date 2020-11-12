import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TareadetailsModalPageRoutingModule } from './tareadetails-modal-routing.module';

import { TareadetailsModalPage } from './tareadetails-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    TareadetailsModalPageRoutingModule
  ],
  declarations: [TareadetailsModalPage]
})
export class TareadetailsModalPageModule {}
