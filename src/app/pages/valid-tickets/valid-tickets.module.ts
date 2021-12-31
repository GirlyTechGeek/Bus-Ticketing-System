import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidTicketsPageRoutingModule } from './valid-tickets-routing.module';

import { ValidTicketsPage } from './valid-tickets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidTicketsPageRoutingModule,
  ],
  declarations: [ValidTicketsPage]
})
export class ValidTicketsPageModule {}
