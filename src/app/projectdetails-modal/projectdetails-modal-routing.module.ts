import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectdetailsModalPage } from './projectdetails-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ProjectdetailsModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectdetailsModalPageRoutingModule {}
