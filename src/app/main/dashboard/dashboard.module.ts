import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {DashboardPageRoutingModule} from './dashboard-routing.module';

import {DashboardPage} from './dashboard.page';
import {FlexModule} from "@angular/flex-layout";
import {SeerPipesModule} from 'src/app/@devseer/pipes/pipes.module';
import {ThemeService} from 'src/app/@devseer/core/theme/theme.service';
import {IonAlertService} from 'src/app/@devseer/shared/services/alert-service.service';

import {
    AngularCopyToClipboardModule
} from "../../@devseer/components/copy-to-clipboard/angular-copy-to-clipboard.module";
import {NgxPaginationModule} from "ngx-pagination";
import {CustomScrollbarModule} from "../../@devseer/components/scroolbar/custom-scrollbar.module";
import {NgSelectModule} from "@ng-select/ng-select";
import {
    DevSeerCountdownModule
} from 'src/app/@devseer/components/dev-seer-countdown-component/dev-seer-countdown.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DashboardPageRoutingModule,
        FlexModule,
        SeerPipesModule,
        AngularCopyToClipboardModule,
        NgxPaginationModule,
        CustomScrollbarModule,
        NgSelectModule,
        DevSeerCountdownModule
    ],
    declarations: [DashboardPage],
    providers: [ThemeService, IonAlertService]
})
export class DashboardPageModule {
}
