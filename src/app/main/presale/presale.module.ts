import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PresalePageRoutingModule } from './presale-routing.module';

import { PresalePage } from './presale.page';
import {FlexModule} from "@angular/flex-layout";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PresalePageRoutingModule,
        FlexModule
    ],
  declarations: [PresalePage]
})
export class PresalePageModule {}
