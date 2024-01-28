import { BscService } from '../../@devseer/services/api/bsc/bsc.service';
import { ContractService } from 'src/app/@devseer/services/contract/contract.service';
import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { environment } from 'src/environments/environment';

@UntilDestroy()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {


  payment = 0;
  tokenInfo = {
    tokenPrice: '',
    marketCap: 0,
    apr: '',
    tvl: 0,
    totalSupply: 0,
    initSupply: 0,
    circulation: 0,
    totalStaked: 0,
    totalStakedPercentage: '0',
    rebaseRatio: 0,
    totalburn: 0,
    totalburnUsd: 0,
    backingPrice: '0',
    circulatingCap: 0
  };
  constructor(private contract: ContractService, private bscService: BscService) {
  }

  ngOnInit() {
    this.bscService.getDexToken(environment.contract).then((callback) => {
      this.tokenInfo.tokenPrice = String(callback.pairs[0].priceUsd);
      this.contract.getBaseInfo(environment.contract).then((base) => {
        this.tokenInfo.totalSupply = Number(base.totalSupply);
        this.tokenInfo.initSupply = base.initSupply;
        this.tokenInfo.rebaseRatio = base.rebaseRatio;
        
        this.tokenInfo.marketCap  = Number(callback.pairs[0].priceUsd) * base.totalSupply;
        this.contract.getSatkingAPR(environment.staking, 0).then((callbackStaking) => {
          this.contract.getPoolInfo(environment.staking, 0).then((callbackStakigPool) => {

            this.tokenInfo.totalStaked = Number(callbackStakigPool.totalTokens);
            this.tokenInfo.circulation = this.tokenInfo.totalStaked + this.tokenInfo.totalSupply;

            this.tokenInfo.totalburn = callbackStakigPool.totalburn;
            this.tokenInfo.tvl = Number(callback.pairs[0].priceUsd) * (this.tokenInfo.totalStaked);
            this.tokenInfo.circulatingCap =  Number(callback.pairs[0].priceUsd) * (this.tokenInfo.circulation);
            
            this.tokenInfo.totalburnUsd = this.tokenInfo.totalburn * callback.pairs[0].priceUsd;
            this.tokenInfo.totalStakedPercentage = Number((this.tokenInfo.totalStaked / this.tokenInfo.circulation) * 100).toFixed(2);
          });
          this.tokenInfo.apr = callbackStaking.apr;

          this.contract.calculateTVL(environment.contract, Number(callback.pairs[0].priceUsd)).then((tvlC) => {
            const lsv =  (Number(this.tokenInfo.totalStaked) + Number(this.tokenInfo.circulation)) * 2;
            this.tokenInfo.backingPrice = (lsv  / (this.tokenInfo.circulation)).toFixed(2);


          })
        });
      });
      
    });
  }

  getTopItems() {
 
  }

  openInNewTab(url) {
    window.open(url); 
  }

}
