import { environment } from 'src/environments/environment';
import {Injectable} from '@angular/core';
import { Web3Storage } from 'web3.storage';
@Injectable()
export class web3S{
  
  getAccessToken() {
    return "environment.web3StorageKey";
  }

  makeStorageClient() {
    return new Web3Storage({ token: this.getAccessToken() })
  }
}
