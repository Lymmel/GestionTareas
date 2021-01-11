import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteEditModalPage } from './cliente-edit-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ClienteEditModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteEditModalPageRoutingModule {}
