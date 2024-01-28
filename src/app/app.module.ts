import { AuthenticationService } from './@devseer/core/authentication-service.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage'
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { SwiperModule } from 'swiper/angular';
import { ContractService } from './@devseer/services/contract/contract.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './@devseer/core/auth-guard.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { web3S } from './@devseer/core/web3Storage';
import {FlexModule} from "@angular/flex-layout";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FlexModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    SwiperModule,
    BrowserAnimationsModule,

  ],
  exports: [],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    [
      {
        provide: LocationStrategy,
        useClass: HashLocationStrategy
      }
    ],
    ContractService,
    AuthenticationService,
    AuthGuard,
    web3S
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
