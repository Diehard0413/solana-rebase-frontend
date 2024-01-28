import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'currency'})
export class CurrencyPipe implements PipeTransform
{
     transform(value: any, args?: any): string
     {
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          });
         return formatter.format(value).substring(1);
     }
}
