import { ContractService } from 'src/app/@devseer/services/contract/contract.service';
import { BscService } from 'src/app/@devseer/services/api/bsc/bsc.service';
import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, startWith } from 'rxjs';
import { environment } from 'src/environments/environment';

@UntilDestroy()
@Component({
  selector: 'app-my-balances',
  templateUrl: './my-balances.page.html',
  styleUrls: ['./my-balances.page.scss'],
})
export class MyBalancesPage implements OnInit {

  obWallet: Observable<any>;
  walletInfo: any = { 
    tokenBalance: 0,
    tokenBalanceUsdt: 0,
    ethBalance: 0,
    stakingBalance: 0,
    bondBlaance: 0,
    stakingLpBalance: 0,
    tokenPrice: 0
  }

  
  constructor(private bscService: BscService, private contract: ContractService) { }

  ngOnInit() {
    this.bscService.getDexToken(environment.contract).then((callback) => {
      this.walletInfo.tokenPrice = Number(callback.pairs[0].priceUsd);
    });

    this.obWallet = this.bscService.onMember;
    this.obWallet.pipe(startWith(undefined),
        untilDestroyed(this))
        .subscribe(async (authCallback: any) => {
          if(authCallback) {
              if (authCallback.wallet !== undefined) {
                console.log('authCallback', authCallback);
                this.contract.getTokenWalletBalance(authCallback.wallet, environment.contract).then((callback) => {
                    this.walletInfo.ethBalance = Number(authCallback.balance);
                    this.walletInfo.tokenBalance = callback;
                    this.walletInfo.tokenBalanceUsdt = this.walletInfo.tokenPrice * Number(this.walletInfo.tokenBalance);
                });
            }
          }
    });



  }

    protected readonly NaN = NaN;
}
