import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContratosPageRoutingModule } from './contratos-routing.module';

import { ContratosPage } from './contratos.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContratosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ContratosPage]
})
export class ContratosPageModule {}
