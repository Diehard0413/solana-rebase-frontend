import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IpfService {

  constructor(private _httpClient: HttpClient) { 
  }

   /**
   * Post Upload file
   *
   * @returns {Promise<any>}
   */

  /**
   * Get Contract abi
   *
   * @returns {Promise<any>}
   */
    //  getAbi(module, action, address): Promise<any> {
    //   return new Promise((resolve, reject) => {
    //     this._httpClient.get(`${environment.bsc_api}module=${module}&action=${action}&address=${address}&apikey=${environment.bsc_key}`)
    //       .subscribe((response: any) => {
    //         resolve(response);
    //       }, reject);
    //   });
    // }

  
}
