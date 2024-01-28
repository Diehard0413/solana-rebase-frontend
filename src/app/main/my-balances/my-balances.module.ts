import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyBalancesPageRoutingModule } from './my-balances-routing.module';

import { MyBalancesPage } from './my-balances.page';
import {FlexModule} from "@angular/flex-layout";
import {NgSelectModule} from "@ng-select/ng-select";
import {NgxPaginationModule} from "ngx-pagination";
import {SeerPipesModule} from "../../@devseer/pipes/pipes.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyBalancesPageRoutingModule,
    FlexModule,
    NgSelectModule,
    NgxPaginationModule,
    SeerPipesModule
  ],
  declarations: [MyBalancesPage]
})
export class MyBalancesPageModule {}
