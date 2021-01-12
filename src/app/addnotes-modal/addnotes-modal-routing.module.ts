import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddnotesModalPage } from './addnotes-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddnotesModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddnotesModalPageRoutingModule {}
