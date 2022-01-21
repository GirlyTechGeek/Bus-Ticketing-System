import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewBusesPage } from './view-buses.page';

const routes: Routes = [
  {
    path: '',
    component: ViewBusesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewBusesPageRoutingModule {}
