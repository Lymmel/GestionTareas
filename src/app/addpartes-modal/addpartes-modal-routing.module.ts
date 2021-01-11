import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddpartesModalPage } from './addpartes-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddpartesModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddpartesModalPageRoutingModule {}
