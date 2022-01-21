import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewBusesPageRoutingModule } from './view-buses-routing.module';

import { ViewBusesPage } from './view-buses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewBusesPageRoutingModule
  ],
  declarations: [ViewBusesPage]
})
export class ViewBusesPageModule {}
