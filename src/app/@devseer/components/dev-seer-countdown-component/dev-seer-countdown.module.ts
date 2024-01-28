import { NgModule } from '@angular/core';
import { DevSeerCountdownComponentComponent } from './dev-seer-countdown-component.component';
import {IonicModule} from "@ionic/angular";
import {FlexModule} from "@angular/flex-layout";


@NgModule({
    declarations: [
        DevSeerCountdownComponentComponent
    ],
    exports: [
        DevSeerCountdownComponentComponent
    ],
    imports: [
        IonicModule,
        FlexModule
    ]
})
export class DevSeerCountdownModule
{
}
