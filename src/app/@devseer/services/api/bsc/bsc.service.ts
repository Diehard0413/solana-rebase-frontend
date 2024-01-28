import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BscService {
  member: BehaviorSubject<any>;
  readonly onMember: Observable<any>;
  jackpotInfo: BehaviorSubject<any>;
  readonly onJacpot: Observable<any>;

  action: BehaviorSubject<any>;
  readonly onAction: Observable<any>;


  constructor(private _httpClient: HttpClient) { 
    this.member = new BehaviorSubject<any>(undefined);
    this.onMember = this.member.asObservable();

    this.action = new BehaviorSubject<any>(undefined);
    this.onAction = this.action.asObservable();
    
    this.jackpotInfo = new BehaviorSubject<any>(undefined);
    this.onJacpot  = this.jackpotInfo.asObservable();
  }

  /**
   * Get Contract abi
   *
   * @returns {Promise<any>}
   */
     getAbi(module, action, address): Promise<any> {
      return new Promise((resolve, reject) => {
        this._httpClient.get(`${environment.bsc_api}module=${module}&action=${action}&address=${address}&apikey=${environment.bsc_key}`)
          .subscribe((response: any) => {
            resolve(response);
          }, reject);
      });
    }

     /**
   * Get Contract abi
   *
   * @returns {Promise<any>}
   */
      getAbiToken(module, action, address): Promise<any> {
        return new Promise((resolve, reject) => {
          this._httpClient.get(`${environment.bsc_api}module=${module}&action=${action}&contractaddress=${address}&apikey=${environment.bsc_key}`)
            .subscribe((response: any) => {
              resolve(response);
            }, reject);
        });
      }
   
      getDexToken(contract): Promise<any> {
        return new Promise((resolve, reject) => {
          this._httpClient.get(`https://api.dexscreener.io/latest/dex/tokens/${contract}`)
            .subscribe((response: any) => {
              resolve(response);
            }, reject);
        });
      }
  
}
