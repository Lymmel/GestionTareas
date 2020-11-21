import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddpedidosModalPage } from './addpedidos-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddpedidosModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddpedidosModalPageRoutingModule {}
