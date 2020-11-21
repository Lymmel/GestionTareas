import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjectdetailsModalPageRoutingModule } from './projectdetails-modal-routing.module';

import { ProjectdetailsModalPage } from './projectdetails-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ProjectdetailsModalPageRoutingModule
  ],
  declarations: [ProjectdetailsModalPage]
})
export class ProjectdetailsModalPageModule {}
