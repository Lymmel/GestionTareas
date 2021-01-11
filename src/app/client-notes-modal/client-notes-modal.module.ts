import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientNotesModalPageRoutingModule } from './client-notes-modal-routing.module';

import { ClientNotesModalPage } from './client-notes-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ClientNotesModalPageRoutingModule
  ],
  declarations: [ClientNotesModalPage]
})
export class ClientNotesModalPageModule {}
