import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosdetailsModalPage } from './pedidosdetails-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosdetailsModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosdetailsModalPageRoutingModule {}
