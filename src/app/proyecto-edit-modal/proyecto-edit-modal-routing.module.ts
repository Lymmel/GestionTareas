import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProyectoEditModalPage } from './proyecto-edit-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ProyectoEditModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProyectoEditModalPageRoutingModule {}
