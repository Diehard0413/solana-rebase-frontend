import { BscService } from '../../@devseer/services/api/bsc/bsc.service';
import { environment } from 'src/environments/environment';
import { IonAlertService } from '../../@devseer/shared/services/alert-service.service';
import { ContractService } from 'src/app/@devseer/services/contract/contract.service';
import { Component, OnInit } from '@angular/core';
import { Observable, startWith } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-etf-bond',
  templateUrl: './etf-bond.page.html',
  styleUrls: ['./etf-bond.page.scss'],
})
export class EtfBondPage implements OnInit {

  segment: string = "bond";
  wallet: string =  undefined;
  tokenInfo= {
    marketCap: 0,
    tokenPrice: '0$'
  }
  spinnerWrapper = {
    isApproving: false,
    isBonding: false,
    isClaiming: false,
    isCompounding: false
  }
  userBondInfo: any;
  bondInfo: any;
  isApproved: boolean = false;
  bondAmount: any = 0;
  obWallet: Observable<any[]>;

  
  constructor(private contract: ContractService, private bscService: BscService, private alertService: IonAlertService) { }

  ngOnInit() {

    this.obWallet = this.bscService.onMember;
    this.obWallet.pipe(startWith(undefined),
        untilDestroyed(this))
        .subscribe(async (authCallback: any) => {
          if(authCallback == undefined) this.wallet = undefined;

          if(authCallback) {
              if (authCallback.wallet !== undefined) {
                this.wallet = authCallback.wallet;
                this.getBondAcc();
              }
          }
    });

    this.contract.getBondInfo(environment.bonds).then((callback) => {
        this.bondInfo = callback;

        this.bscService.getDexToken(environment.contract).then((callback) => {
          let marketPrice = Number(callback.pairs[0].priceUsd);
          let discount = (((this.bondInfo.bondPrice - marketPrice) / this.bondInfo.bondPrice) * 100);
          if (discount > 20) {
            discount = 20;
          } else if (discount < -20) {
            discount = -20;
          }
          
          this.bondInfo['discount'] = discount.toFixed(2);
        
        });
    });
  }

  getBondAcc() {
    this.contract.fetchBondDetails(environment.bonds, this.wallet).then((callback) => {
      this.userBondInfo = callback;
      console.log('bondInfo', this.userBondInfo);

      this.contract.getUSDCBalance(this.wallet
        , environment.USDC).then((callback) => {
        this.userBondInfo['balance'] = callback;
      })
    });
  }


  getMarketPrice() {
    this.bscService.getDexToken(environment.contract).then((callback) => {
      this.tokenInfo.marketCap  = callback.pairs[0].fdv;
      this.tokenInfo.tokenPrice = String(callback.pairs[0].priceUsd);
    });
  }

  approve() {
    this.spinnerWrapper.isApproving = true;
    this.contract.approveBond(this.wallet, environment.bonds, this.bondAmount, environment.USDC).then((callback) => {
      this.spinnerWrapper.isApproving = false;
      this.isApproved = true;
      this.alertService.presentToast('Bond Approved Succesful');
    }).catch(() => this.spinnerWrapper.isApproving = false)
  }

  bond() {
    this.spinnerWrapper.isBonding = true;
    this.contract.bondTokens(environment.bonds, this.wallet, this.bondAmount).then((callback) => {
      this.spinnerWrapper.isBonding = false;
      this.alertService.presentToast('Bonded Succesful');
      this.getBondAcc();
    }).catch(() => this.spinnerWrapper.isBonding = false);
  }

  claim() {
    this.spinnerWrapper.isClaiming = true;
    this.contract.bondClaim(environment.bonds, this.wallet).then((callback) => {
        this.spinnerWrapper.isClaiming = false;
        this.alertService.presentToast('Claimed Succesful');
        this.getBondAcc();
    }).catch(() => this.spinnerWrapper.isClaiming = false);
  }

  addMax() {
    this.bondAmount = Number(this.userBondInfo['balance']).toFixed(4);
  }

}
