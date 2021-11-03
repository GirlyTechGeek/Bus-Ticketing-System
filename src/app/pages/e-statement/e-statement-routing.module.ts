import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EStatementPage } from './e-statement.page';

const routes: Routes = [
  {
    path: '',
    component: EStatementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EStatementPageRoutingModule {}
