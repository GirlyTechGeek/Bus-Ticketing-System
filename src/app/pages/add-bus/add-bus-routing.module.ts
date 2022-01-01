import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddBusPage } from './add-bus.page';

const routes: Routes = [
  {
    path: '',
    component: AddBusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddBusPageRoutingModule {}
