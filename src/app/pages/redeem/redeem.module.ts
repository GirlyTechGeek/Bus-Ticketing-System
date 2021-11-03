import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RedeemPageRoutingModule } from './redeem-routing.module';

import { RedeemPage } from './redeem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RedeemPageRoutingModule
  ],
  declarations: [RedeemPage]
})
export class RedeemPageModule {}
