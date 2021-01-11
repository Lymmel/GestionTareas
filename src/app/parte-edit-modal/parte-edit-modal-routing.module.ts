import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParteEditModalPage } from './parte-edit-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ParteEditModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParteEditModalPageRoutingModule {}
