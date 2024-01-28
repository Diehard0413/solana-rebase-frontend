import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LpStakePageRoutingModule } from './lp-stake-routing.module';

import { LpStakePage } from './lp-stake.page';
import {FlexModule} from "@angular/flex-layout";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LpStakePageRoutingModule,
        FlexModule
    ],
  declarations: [LpStakePage]
})
export class LpStakePageModule {}
