import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EStatementPageRoutingModule } from './e-statement-routing.module';

import { EStatementPage } from './e-statement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EStatementPageRoutingModule
  ],
  declarations: [EStatementPage]
})
export class EStatementPageModule {}
