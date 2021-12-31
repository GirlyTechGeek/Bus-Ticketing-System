import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidTicketsPage } from './valid-tickets.page';

const routes: Routes = [
  {
    path: '',
    component: ValidTicketsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidTicketsPageRoutingModule {}
