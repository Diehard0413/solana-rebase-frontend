import { BscService } from '../../@devseer/services/api/bsc/bsc.service';
import { environment } from 'src/environments/environment';
import { IonAlertService } from '../../@devseer/shared/services/alert-service.service';
import { ContractService } from 'src/app/@devseer/services/contract/contract.service';
import { Component, OnInit } from '@angular/core';
import { Observable, of, startWith } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';


@UntilDestroy()
@Component({
    selector: 'app-lp-bond',
    templateUrl: './lp-bond.page.html',
    styleUrls: ['./lp-bond.page.scss'],
})
export class LpBondPage implements OnInit {

    segment: string = "bond";
    wallet: string = undefined;
    tokenInfo = {
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
    lpAddress: any;
    deeplinkUrl: string = `https://app.uniswap.org/add/v2/ETH/${environment.contract}`


    constructor(private contract: ContractService, private bscService: BscService, private alertService: IonAlertService) {
    }

    ngOnInit() {

        this.obWallet = this.bscService.onMember;
        this.obWallet.pipe(startWith(undefined),
            untilDestroyed(this))
            .subscribe(async (authCallback: any) => {
                if (authCallback == undefined) this.wallet = undefined;

                if (authCallback) {
                    if (authCallback.wallet !== undefined) {
                        this.wallet = authCallback.wallet;
                        this.getBondAcc();
                    }
                }
            });

        this.contract.getBondInfo(environment.lpBond).then((callback) => {
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
        this.contract.getBaseInfo(environment.contract).then((callbackBase) => {
            this.contract.fetchBondDetails(environment.lpBond, this.wallet).then((callback) => {
                this.userBondInfo = callback;

                this.lpAddress = callbackBase.LPpoolAddress;
                this.contract.getTokenWalletBalance(this.wallet, callbackBase.LPpoolAddress).then((callback) => {
                    this.userBondInfo['balance'] = callback;
                })
            });
        });
        
    }


    getMarketPrice() {
        this.bscService.getDexToken(environment.contract).then((callback) => {
            this.tokenInfo.marketCap = callback.pairs[0].fdv;
            this.tokenInfo.tokenPrice = String(callback.pairs[0].priceUsd);
        });
    }

    approve() {
        this.spinnerWrapper.isApproving = true;
        this.contract.approveStake(this.wallet, environment.lpBond, this.bondAmount, this.lpAddress).then((callback) => {
            this.spinnerWrapper.isApproving = false;
            this.isApproved = true;
            this.alertService.presentToast('Bond Approved Succesful');
        }).catch(() => this.spinnerWrapper.isApproving = false)
    }

    bond() {
        this.spinnerWrapper.isBonding = true;
        this.contract.bondLPTokens(environment.lpBond, this.wallet, this.bondAmount).then((callback) => {
            this.spinnerWrapper.isBonding = false;
            this.alertService.presentToast('Bonded Succesful');
            this.getBondAcc();
        }).catch(() => this.spinnerWrapper.isBonding = false);
    }

    claim() {
        this.spinnerWrapper.isClaiming = true;
        this.contract.bondClaim(environment.lpBond, this.wallet).then((callback) => {
            this.spinnerWrapper.isClaiming = false;
            this.alertService.presentToast('Claimed Succesful');
            this.getBondAcc();
        }).catch(() => this.spinnerWrapper.isClaiming = false);
    }

    addMax() {
        this.bondAmount = Number(this.userBondInfo['balance']).toFixed(4);
    }

}