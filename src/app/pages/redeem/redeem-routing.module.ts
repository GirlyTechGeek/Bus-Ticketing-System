import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RedeemPage } from './redeem.page';

const routes: Routes = [
  {
    path: '',
    component: RedeemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RedeemPageRoutingModule {}
