import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StakePageRoutingModule } from './stake-routing.module';

import { StakePage } from './stake.page';
import {FlexModule} from "@angular/flex-layout";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StakePageRoutingModule,
    FlexModule
  ],
  declarations: [StakePage]
})
export class StakePageModule {}
