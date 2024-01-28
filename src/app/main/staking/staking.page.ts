import { BscService } from '../../@devseer/services/api/bsc/bsc.service';
import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable, startWith } from 'rxjs';
import { ContractService } from 'src/app/@devseer/services/contract/contract.service';
import { environment } from 'src/environments/environment';
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'app-staking',
  templateUrl: './staking.page.html',
  styleUrls: ['./staking.page.scss'],
})
export class StakingPage  {

//   isLargeNumber: boolean = true;
  
  
//   public timenow = Math.round(new Date().getTime()/1000);
//   public currentWindowWidth: number;
//   public loading: boolean = false;
//   segment = 'dashboard';
//   public spinner: boolean = false;
//   public harvest: boolean = false;
//   public wallet: any;
//   private originalWallet: any;
//   public walletBalance: any = 0;
//   public stakeAmount: any = 0;

//   public tokenInfo: any;
//   public stakingInfo: any;
//   public contract: any = environment.contract;
//   public stakingContract: any = environment.stakingContract;
//   public walletBalanceTokeBusd: any = 0;
//   public tokenPrice: string;
//   public distributedInfo: any;
//   user: any = {wallet: undefined, balance: 0, dividend: undefined};
//   public apporval: boolean = false;


//   obWallet: Observable<any[]>;
//   obMemmber: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
//   obInfo: Observable<any[]>;
//   onInfo: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  
//   constructor(private cd: ChangeDetectorRef, 
//     private contractService:ContractService,
//     private bscService: BscService,
//     private router: Router,
//     public alertController: AlertController,
//     public platform: Platform) {
//   }

//   ngOnInit() {
//     this.currentWindowWidth = window.innerWidth;
//     this.getStaking('');

//     this.obWallet = this.bscService.onMember;
//     this.obWallet.pipe(startWith(undefined),
//         untilDestroyed(this))
//         .subscribe(async (wallet: any) => {
//             if (wallet.wallet !== undefined) {
//               console.log('wallet', wallet);
//               this.fetchContexData();
//               this.getStaking(wallet.wallet);
//             }
//           });
  
//   }

//   fetchContexData() {
//     this.loading = true;
//     this.contractService.connectAccount().then((callback) => {
//       this.user['wallet'] = callback;
//       this.contractService.getBVWalletBalance(callback, this.contract).then((balance) => {
//         this.user['balance'] = (Number(balance)).toFixed(4);
//         this.contractService.calBitValleyPurchase(this.contract, 1).then((callbackTokenPurchased) => {
//           this.tokenPrice = Number(callbackTokenPurchased.tokenPriceInUSD).toFixed(9);
//         });
//         this.contractService.calBitValleyPurchase(this.contract, balance).then((callbackTokenPurchased) => {
//           this.walletBalanceTokeBusd = callbackTokenPurchased.tokenPriceInUSD;
//         });
//         this.walletBalance = (Number(balance));
//         this.wallet = this.contractService.shortenWallet(callback);
//       });
//     });
//   }

//   getStaking(callback) {
//     this.contractService.getDividendInfo(this.user['wallet']).then((callback) => {
//       console.log('dividend', callback);
//     });

//     this.contractService.getTokeInfo(this.contract).then((callbackInfo) => {
//       this.tokenInfo = callbackInfo;
//       this.tokenInfo.marketingBalance = Number(this.tokenInfo.marketingBalance).toFixed(4);
//       this.tokenInfo.dividendBnb = Number(this.tokenInfo.dividendBnb).toFixed(4);
//       this.loading = false;
//     });
   
//     this.contractService.getStakingInfo(this.stakingContract, callback).then((callbackStake) =>{
//       this.distributedInfo = callbackStake;
//       console.log('callbackStake', callbackStake);
//       this.distributedInfo['amount'] = Number(this.distributedInfo['amount']);
//       this.distributedInfo['depositedAt']  = new Date( this.distributedInfo['depositedAt'] * 1000);
//       const dateClaimed = this.distributedInfo['claimedAt'];
//       this.distributedInfo['claimedAt']  = new Date( this.distributedInfo['claimedAt'] * 1000);
//       this.distributedInfo['nextclaimedAt']  = new Date(dateClaimed * 1000);
//       this.distributedInfo['nextclaimedAt'] = 
//        this.distributedInfo['nextclaimedAt'].setHours(this.distributedInfo['nextclaimedAt']
//       .getHours() +  Math.floor(Number(this.distributedInfo['rewardCycle'] / 3600)));
//       this.distributedInfo['apr'] = this.calApr(Number(this.distributedInfo['rewardRate']),  Number(this.distributedInfo['totalSupply']));
      

//       this.contractService.getBVWalletBalance(this.stakingContract, this.contract).then((stakingBalanceTokens) => {
//         this.contractService.calBitValleyPurchase(this.contract, stakingBalanceTokens).then((callbackTokenPurchased) => {
//           this.distributedInfo['stakingPool']= callbackTokenPurchased.tokenPriceInUSD.toFixed(4);
//         });
//       });
//       this.contractService.calBitValleyPurchase(this.contract,  this.distributedInfo.amount).then((callbackTokenPurchased) => {
//         this.distributedInfo['amountBnb'] =  Number(callbackTokenPurchased.tokenPriceInUSD).toFixed(4);
//       });
//       this.contractService.calBitValleyPurchase(this.contract,  this.distributedInfo.accPerShare).then((callbackTokenPurchased) => {
//         this.distributedInfo['accPerShareBnb'] =  Number(callbackTokenPurchased.tokenPriceInUSD).toFixed(4);
//       });
//       this.contractService.calBitValleyPurchase(this.contract,  this.distributedInfo.rewardDebt).then((callbackTokenPurchased) => {
//         this.distributedInfo.rewardDebt = Number(this.distributedInfo.rewardDebt).toFixed(4);
//         this.distributedInfo['totalRewardBnb'] =  Number(callbackTokenPurchased.tokenPriceInUSD).toFixed(4);
//       });
      
//     });
//   }

//   @HostListener('window:resize')
//   onResize() {
//     this.currentWindowWidth = window.innerWidth;
//   }

//   segmentChanged(ev: any) {
//     if(ev.detail.value ==='staking') {
//       this.cd.detectChanges();
//     }
//   }

//   openAccordionValue() {

//   }

//   logAccordionValue() {
//   }

//   closeAccordion() {
//   }

//   deposite() {
  
//     if(this.stakeAmount > this.walletBalance ) {
//       alert('Input exceeds balance.');
//       return;
//     }

//     if(this.stakeAmount < 1 ) {
//       alert('Cannot deposite such low value.');
//       return;
//     }
//     this.spinner =true;
//     this.contractService.stake(this.user['wallet'], this.stakeAmount, this.stakingContract).then((callback) => {
//       this.fetchContexData();
//       this.spinner =false;
//     }).catch(() =>  this.spinner =false);
//   }

//   approve() {
//     this.spinner =true;
//     this.contractService.approveStake(this.user['wallet'], this.stakingContract, this.user['balance'], this.contract).then((callback) => {
//       this.apporval = true;
//       this.spinner =false;
//     }).catch(() =>  this.spinner =false);
//   }

//  async withdraw(){
//     const alert = await this.alertController.create({
//       cssClass: 'my-custom-class',
//       header: 'Confirm Unstaking!',
//       message: `Unstaking early has penalty fee of <strong>${this.distributedInfo?.penaltyFee} %</strong>`,
//       buttons: [
//         {
//           text: 'Cancel',
//           role: 'cancel',
//           cssClass: 'secondary',
//           id: 'cancel-button',
//           handler: (blah) => {
//           }
//         }, {
//           text: 'Okay',
//           id: 'confirm-button',
//           handler: () => {
//            this.spinner =  true;
//             // this.contractService.withdraw(this.user['wallet'], this.stakeAmount, this.stakingContract).then((callback) => {
//             //   this.fetchContexData();
//             //   this.spinner =false;
//             // }).catch(() =>  this.spinner =false);
//           }
//         }
//       ]
//     });
//     await alert.present();

//     await alert.onDidDismiss();

//   }

//   claim() {
//     this.harvest =true;
//     this.contractService.claimTokens('', this.user['wallet'], this.stakingContract).then((callback) =>{
//       // this.spinner =false;
//       // this.apporval = false;
//       this.harvest = false;
//       this.fetchContexData();
//     }).catch(() => this.harvest = false);
//   }

//   claimReward() {
//     this.spinner =true;
//     this.contractService.claimReward('', this.user['wallet'], this.contract).then((callback) =>{
//       this.spinner =false;
//       this.apporval = false;
//       this.fetchContexData();
//     }).catch(() => this.spinner = false);
//   }

//   txComoleted(){
//     this.fetchContexData();
//   }

//   percentage(num, per)
//   {
//     return (num/100)*per;
//   }

//   logout() {
//     this.contractService.onDisconnect().then(() => {
//       this.router.navigate(['login']);
//       localStorage.clear();
//     });
//   }

//   maxAdd() {
//     this.stakeAmount = Math.floor(this.user['balance']);
//   }
  
//   calApr(rate, supply) {
//     return (((rate * 365 * 86400) / supply) * 100).toFixed(1);
//   }

//    secondsToHms(d) {
//     d = Number(d);
//     var h = Math.floor(d / 3600);
//     var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
//     return h; 
// }
}
