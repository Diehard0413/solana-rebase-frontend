import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CovaService {

  holders: BehaviorSubject<any>;
  constructor(private _httpClient: HttpClient) { 
    this.holders = new BehaviorSubject({});
  }

  /**
   * Get 100 holders
   *
   * @returns {Promise<any>}
   */
     getTopHolders(page): Promise<any> {
      return new Promise((resolve, reject) => {
        this._httpClient.get(
          `https://api.covalenthq.com/v1/56/tokens/${environment.contract}/token_holders/?quote-currency=USD&format=JSON&page-number=${page}&page-size=100&key=ckey_84d9dfd367b242b194f4767831a`)
          .subscribe((response: any) => {
            this.holders.next(response);
            resolve(response);
          }, reject);
      });
    }
    // https://api.covalenthq.com/v1/1/tokens/0x3883f5e181fccaf8410fa61e12b59bad963fb645/token_holders/?quote-currency=USD&format=JSON&page-number=1&page-size=100&key=ckey_docs
  /**
   * Get Wallet Transactions
   *
   * @returns {Promise<any>}
   */
      getWalletTransactions(wallet): Promise<any> {
        return new Promise((resolve, reject) => {
          this._httpClient.get(
            `https://api.covalenthq.com/v1/56/address/${wallet}/transactions_v2/?key=ckey_84d9dfd367b242b194f4767831a`)
            .subscribe((response: any) => {
              this.holders.next(response);
              resolve(response);
            }, reject);
        });
      }


      getHistoricalData(): Promise<any> {
        return new Promise((resolve, reject) => {
          this._httpClient.get(
            `https://api.covalenthq.com/v1/56/address/${environment.contract}/portfolio_v2/?key=ckey_84d9dfd367b242b194f4767831a`)
            .subscribe((response: any) => {
              this.holders.next(response);
              resolve(response);
            }, reject);
        });
        // /v1/
        // chain_id
        // 1
        // /address/
        // address
        // demo.eth
        // /portfolio_v2/
      }
    // 
  
}
