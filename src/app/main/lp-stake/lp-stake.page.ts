import { BscService } from '../../@devseer/services/api/bsc/bsc.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ContractService } from 'src/app/@devseer/services/contract/contract.service';
import { IonAlertService } from 'src/app/@devseer/shared/services/alert-service.service';
import { environment } from 'src/environments/environment';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { startWith } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-lp-stake',
  templateUrl: './lp-stake.page.html',
  styleUrls: ['./lp-stake.page.scss'],
})
export class LpStakePage implements OnInit {


  segment: string = "stake";
  wallet: string = undefined;
  spinnerWrapper = {
    isApproving: false,
    isDepositing: false,
    isClaiming: false,
    isStaking: false,
    isUnstaking: false,
    isCompounding: false
  }
  userStakingInfo: any;
  stakingInfo: any;
  isApproved: boolean = true;
  isStaked: boolean;
  stakeAmount: number;
  obWallet: Observable<any[]>;
  deeplinkUrl: string = `https://app.uniswap.org/add/v2/ETH/${environment.contract}`


  constructor(private contract: ContractService, private alertService: IonAlertService, private bscService: BscService) { }

  ngOnInit() {

    this.obWallet = this.bscService.onMember;
    this.obWallet.pipe(startWith(undefined),
        untilDestroyed(this))
        .subscribe(async (authCallback: any) => {

          if(authCallback == undefined) this.wallet = undefined;

            if(authCallback) {
              if (authCallback.wallet !== undefined) {
                this.wallet = authCallback.wallet;
                this.getLpStakeAcc();
              }
            }
    });
          
    this.contract.getPoolInfo(environment.lpStaking, 0).then((callback) => { 
        this.stakingInfo = callback;
        this.bscService.getDexToken(environment.contract).then((callback) => {
          
          this.contract.getBaseInfo(environment.contract).then((callbackBase) => {
            this.contract.getTokenWalletBalance(callbackBase.LPpoolAddress, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2').then((callbackEthLPAmount) => {
              this.contract.getTokenWalletBalance(callbackBase.LPpoolAddress, environment.contract).then((callbackOHMLPAmount) => {
                  const ohmTokenLpPrice = Number(callbackOHMLPAmount) * Number(callback.pairs[0].priceUsd);
                  this.bscService.getDexToken('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2').then((callbackEth) => {
                      const ohmEthLpPrice = Number(callbackEthLPAmount) * Number(callbackEth.pairs[0].priceUsd);
                      this.stakingInfo['totalTokensUsdt'] = ohmEthLpPrice;
                  });
              });
            });
          });
          this.contract.getStakingAPYLP(environment.lpStaking, 0, Number(callback.pairs[0].priceUsd)).then((callback) => {
            this.stakingInfo['apr'] = (callback.apr * 10).toFixed(2);
            this.stakingInfo['dailyapr'] = (callback.dailyapr * 10).toFixed(2);
          });
        });
       
    });
   
  }

  getLpStakeAcc() {
    this.contract.getPoolUserInfo(environment.lpStaking, 0, this.wallet).then((callback) => {
      this.userStakingInfo = callback;
      this.contract.getTokenWalletBalance(this.wallet, this.stakingInfo.lpToken).then((callbackBalance) => {
        this.userStakingInfo['walletBalance'] = callbackBalance;
      })
    });
  }

  approve() {
    this.spinnerWrapper.isApproving = true;
    this.contract.approveStake(this.wallet, environment.lpStaking, this.stakeAmount, this.stakingInfo.lpToken).then((callback) => {
      this.spinnerWrapper.isApproving = false;
      this.alertService.presentToast('LP Approved Succesful');
      this.isApproved = true;
    }).catch(() => this.spinnerWrapper.isApproving = false)
  }

  deposit() {
    this.spinnerWrapper.isDepositing = true;
    this.contract.stake(environment.lpStaking, this.wallet, 0, this.stakeAmount).then((callback) => {
      this.spinnerWrapper.isDepositing = false;
      this.alertService.presentToast('Deposited Succesful');
      this.getLpStakeAcc();
    }).catch(() =>  this.spinnerWrapper.isDepositing = false)
  }
  claim() {
    this.spinnerWrapper.isClaiming = true;
    this.contract.stake(environment.lpStaking, this.wallet, 0, 0).then((callback) => {
      this.spinnerWrapper.isClaiming = false;
      this.alertService.presentToast('Claimed Succesful');
      this.getLpStakeAcc();
    }).catch(() =>  this.spinnerWrapper.isClaiming = false)
  }
  compund() {
    this.spinnerWrapper.isCompounding = true;
    this.contract.stake(environment.lpStaking, this.wallet, 0, this.stakeAmount).then((callback) => {
      this.spinnerWrapper.isCompounding = false;
      this.alertService.presentToast('Compound Succesful');
    }).catch(() =>  this.spinnerWrapper.isCompounding = false)
  }

  unstake() {
    this.spinnerWrapper.isUnstaking = true;
    this.contract.usntake(environment.lpStaking, this.wallet, 0, this.stakeAmount).then((callback) => {
      this.spinnerWrapper.isUnstaking = false;
      this.alertService.presentToast('Unstake Succesful');
      this.getLpStakeAcc();
    }).catch(() =>  this.spinnerWrapper.isUnstaking = false)
  }
  addMax() {
    if(this.segment =='stake') {
      this.stakeAmount = this.userStakingInfo['walletBalance'];
    } else {
      this.stakeAmount = this.userStakingInfo?.amount;
    }
  }
}
