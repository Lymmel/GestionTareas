import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddproyectosModalPage } from './addproyectos-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddproyectosModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddproyectosModalPageRoutingModule {}
