import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {
  
  transform(value: any[], ...args: unknown[]): any {
     return value.map(o => Number(o.priceImpact.tokenPriceInUSD)).reduce((a, c) => { return Number(a) + Number(c) });
  }

}
