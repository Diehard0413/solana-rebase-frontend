import { Pipe, PipeTransform } from '@angular/core';
import { DevSeerUtils } from '../utils';

@Pipe({
  name: 'chainCurrency'
})
export class ChainCurrencyPipe implements PipeTransform {

  networks = DevSeerUtils.networkManager();
  transform(value: unknown, ...args: unknown[]): any {
    return this.networks.find(a => a.chainId === value).currency.symbol;
  }
}
