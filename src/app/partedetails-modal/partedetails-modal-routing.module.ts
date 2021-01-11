import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartedetailsModalPage } from './partedetails-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PartedetailsModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartedetailsModalPageRoutingModule {}
