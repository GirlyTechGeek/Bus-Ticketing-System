import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepositPageRoutingModule } from './deposit-routing.module';

import { DepositPage } from './deposit.page';
import {Angular4PaystackModule} from "angular4-paystack";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DepositPageRoutingModule,
        ReactiveFormsModule,
        Angular4PaystackModule
    ],
  declarations: [DepositPage]
})
export class DepositPageModule {}
