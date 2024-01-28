import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { ContractService } from '../services/contract/contract.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService{
  private contract: any = '0xdD8B490001D081eD065239644dae8D1a77b8A91F'

  authState = new BehaviorSubject(undefined);

  constructor(
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    public toastController: ToastController,
    private contractService:  ContractService
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

  ifLoggedIn() {
    // this.storage.get('DASH_INFO').then((response) => {
    //   if (response) {
    //   const data = JSON.parse((response));
    //     this.contractService.connectAccount().then((account) => {
    //       if(data.user_wallet === account){
    //         this.authState.next(true);
    //       }else {
    //         this.authState.next(false);
    //       }
    //     });
    //   }
    // });
  }


  login(): Promise<any>{
    var data = {
      user_wallet: undefined,
      updated_at: Date.now
    };
    return new Promise((resolve, rejects) => {
      // this.contractService.connectAccount().then((account) => {
      //   data.user_wallet = account;
      //   this.contractService.getBVWalletBalance(account, this.contract).then((callbackBalance) => {
      //     if(callbackBalance <= 100000) {
      //       resolve(false);
      //       return;
      //     }
      //     this.storage.set('DASH_INFO', JSON.stringify(data)).then((response) => {
      //       this.authState.next(true);
      //       resolve(true);
      //     });
      //   }).catch((err) => rejects(err));
      // }).catch((err) => rejects(err));
    })
  }

  logout() {
    this.storage.remove('DASH_INFO').then(() => {
      this.contractService.onDisconnect();
      this.router.navigate(['login']);
      this.authState.next(false);
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }

}
