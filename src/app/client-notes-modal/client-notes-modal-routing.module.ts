import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientNotesModalPage } from './client-notes-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ClientNotesModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientNotesModalPageRoutingModule {}
