import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddtareasModalPage } from './addtareas-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddtareasModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddtareasModalPageRoutingModule {}
