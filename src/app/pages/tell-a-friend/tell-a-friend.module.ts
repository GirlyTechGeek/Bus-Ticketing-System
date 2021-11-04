import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TellAFriendPageRoutingModule } from './tell-a-friend-routing.module';

import { TellAFriendPage } from './tell-a-friend.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TellAFriendPageRoutingModule
  ],
  declarations: [TellAFriendPage]
})
export class TellAFriendPageModule {}
