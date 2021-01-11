import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TareaEditModalPage } from './tarea-edit-modal.page';

const routes: Routes = [
  {
    path: '',
    component: TareaEditModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TareaEditModalPageRoutingModule {}
