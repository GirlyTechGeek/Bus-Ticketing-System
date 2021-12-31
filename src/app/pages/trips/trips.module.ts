import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TripsPageRoutingModule } from './trips-routing.module';

import { TripsPage } from './trips.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TripsPageRoutingModule
  ],
  declarations: [TripsPage]
})
export class TripsPageModule {}
