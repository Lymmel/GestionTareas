import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddclientModalPage } from './addclient-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddclientModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddclientModalPageRoutingModule {}
