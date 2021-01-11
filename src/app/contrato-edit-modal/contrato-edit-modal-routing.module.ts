import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContratoEditModalPage } from './contrato-edit-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ContratoEditModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContratoEditModalPageRoutingModule {}
