import { BscService } from 'src/app/@devseer/services/api/bsc/bsc.service';
import { environment } from 'src/environments/environment';
import { ContractService } from 'src/app/@devseer/services/contract/contract.service';
import { Component, OnInit } from '@angular/core';
import { IonAlertService } from 'src/app/@devseer/shared/services/alert-service.service';
import { Observable } from 'rxjs/internal/Observable';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { startWith } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-stake',
  templateUrl: './stake.page.html',
  styleUrls: ['./stake.page.scss'],
})
export class StakePage implements OnInit {

  segment: string = "stake";
  wallet: string = undefined;
  spinnerWrapper = {
    isApproving: false,
    isDepositing: false,
    isClaiming: false,
    isUnstaking: false,
    isCompounding: false
  }
  userStakingInfo: any;
  stakingInfo: any;
  isApproved: boolean = true;
  isStaked: boolean;
  stakeAmount: number;
  obWallet: Observable<any[]>;

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
                this.getStakeAcc();
            }
          }
    });

    this.contract.getPoolInfo(environment.staking, 0).then((callback) => { 
        this.stakingInfo = callback;
        this.bscService.getDexToken(environment.contract).then((callback) => {
          this.stakingInfo['totalTokensUsdt'] = Number(callback.pairs[0].priceUsd) * Number(this.stakingInfo.totalTokens);
        });
        this.contract.getSatkingAPR(environment.staking, 0).then((callback) => {
          this.stakingInfo['apr'] = callback.apr;
          this.stakingInfo['dailyapr'] = callback.dailyapr;
        });
    });
 
  }

  getStakeAcc() {
    this.contract.getPoolUserInfo(environment.staking, 0, this.wallet).then((callback) => {
      this.userStakingInfo = callback;
      this.contract.getTokenWalletBalance(this.wallet, environment.contract).then((callback) => {
        this.userStakingInfo['walletBalance'] = callback;
      })
   });
  }

  approve() {
    this.spinnerWrapper.isApproving = true;
    this.contract.approveStake(this.wallet, environment.staking, this.stakeAmount, environment.contract).then((callback) => {
      this.spinnerWrapper.isApproving = false;
      this.isApproved = true;
      this.alertService.presentToast('Approved Succesful');
    }).catch(() => this.spinnerWrapper.isApproving = false)
  }

  deposit() {
    this.spinnerWrapper.isDepositing = true;
    this.contract.stake(environment.staking, this.wallet, 0, this.stakeAmount).then((callback) => {
      this.spinnerWrapper.isDepositing = false;
      this.getStakeAcc()
      this.alertService.presentToast('Deposited Succesful');
    }).catch(() =>  this.spinnerWrapper.isDepositing = false)
  }
  claim() {
    this.spinnerWrapper.isClaiming = true;
    this.contract.stake(environment.staking, this.wallet, 0, 0).then((callback) => {
      this.spinnerWrapper.isClaiming = false;
      this.getStakeAcc();
      this.alertService.presentToast('Claimed Succesful');
    }).catch(() =>  this.spinnerWrapper.isClaiming = false)
  }

  compund() {
    this.spinnerWrapper.isCompounding = true;
    this.contract.stake(environment.staking, this.wallet, 0, this.stakeAmount).then((callback) => {
      this.spinnerWrapper.isCompounding = false;
      this.getStakeAcc();
      this.alertService.presentToast('Compound Succesful');
    }).catch(() =>  this.spinnerWrapper.isCompounding = false)
  }
  unstake() {
    this.spinnerWrapper.isUnstaking = true;
    this.contract.usntake(environment.staking, this.wallet, 0, this.stakeAmount).then((callback) => {
      this.spinnerWrapper.isUnstaking = false;
      this.getStakeAcc();
      this.alertService.presentToast('Unstake Succesful');
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
