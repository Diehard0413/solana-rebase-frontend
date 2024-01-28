import {BscService} from '../@devseer/services/api/bsc/bsc.service';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MainPageRoutingModule} from './main-routing.module';

import {MainPage} from './main.page';
import {FlexModule} from "@angular/flex-layout";
import {SeerPipesModule} from '../@devseer/pipes/pipes.module';
import {AngularCopyToClipboardModule} from "../@devseer/components/copy-to-clipboard/angular-copy-to-clipboard.module";
import {ContractService} from '../@devseer/services/contract/contract.service';
import {CustomScrollbarModule} from "../@devseer/components/scroolbar/custom-scrollbar.module";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MainPageRoutingModule,
        FlexModule,
        SeerPipesModule,
        AngularCopyToClipboardModule,
        CustomScrollbarModule,
    ],
    declarations: [MainPage],
    providers: [ContractService, BscService]
})
export class MainPageModule {
}
