import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddcontratosModalPage } from './addcontratos-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddcontratosModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddcontratosModalPageRoutingModule {}
