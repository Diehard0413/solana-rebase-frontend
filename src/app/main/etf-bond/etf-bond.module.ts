import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {EtfBondPageRoutingModule} from './etf-bond-routing.module';

import {EtfBondPage} from './etf-bond.page';
import {FlexModule} from "@angular/flex-layout";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EtfBondPageRoutingModule,
        FlexModule
    ],
    declarations: [EtfBondPage]
})
export class EtfBondPageModule {
}
