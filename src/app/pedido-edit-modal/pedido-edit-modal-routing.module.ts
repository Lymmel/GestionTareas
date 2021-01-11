import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidoEditModalPage } from './pedido-edit-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PedidoEditModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoEditModalPageRoutingModule {}
