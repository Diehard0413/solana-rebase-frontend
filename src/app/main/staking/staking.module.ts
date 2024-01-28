import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StakingPageRoutingModule } from './staking-routing.module';

import { StakingPage } from './staking.page';
import {FooterModule} from "../../components/footer/footer.module";
import {FlexModule} from "@angular/flex-layout";
import { SeerPipesModule } from 'src/app/@devseer/pipes/pipes.module';
import { DevSeerCountdownModule } from 'src/app/@devseer/components/dev-seer-countdown-component/dev-seer-countdown.module';
import {AccountModule} from "../../components/account/account.module";
import {CustomScrollbarModule} from "../../@devseer/components/scroolbar/custom-scrollbar.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        StakingPageRoutingModule,
        SeerPipesModule,
        FooterModule,
        FlexModule,
        DevSeerCountdownModule,
        AccountModule,
        CustomScrollbarModule
    ],
  declarations: [StakingPage]
})
export class StakingPageModule {}
