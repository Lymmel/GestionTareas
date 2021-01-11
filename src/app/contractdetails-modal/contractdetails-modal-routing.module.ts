import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContractdetailsModalPage } from './contractdetails-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ContractdetailsModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractdetailsModalPageRoutingModule {}
