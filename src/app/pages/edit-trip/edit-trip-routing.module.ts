import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditTripPage } from './edit-trip.page';

const routes: Routes = [
  {
    path: '',
    component: EditTripPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditTripPageRoutingModule {}
