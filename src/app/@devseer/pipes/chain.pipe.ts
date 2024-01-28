import { Pipe, PipeTransform } from '@angular/core';
import { DevSeerUtils } from '../utils';

@Pipe({
  name: 'chain'
})
export class ChainPipe implements PipeTransform {

  networks = DevSeerUtils.networkManager();
  transform(value: unknown, ...args: unknown[]): any {
    return this.networks.find(a => a.chainId === value).chainName;
  }

}
