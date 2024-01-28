import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {LpBondPageRoutingModule} from './lp-bond-routing.module';

import {LpBondPage} from './lp-bond.page';
import {FlexModule} from "@angular/flex-layout";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LpBondPageRoutingModule,
        FlexModule
    ],
    declarations: [LpBondPage]
})
export class LpBondPageModule {
}
