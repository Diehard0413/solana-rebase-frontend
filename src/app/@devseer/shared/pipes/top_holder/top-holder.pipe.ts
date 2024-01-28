import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'topHolder'
})
export class TopHolderPipe implements PipeTransform {

  transform(value: string, ...args: any[]): unknown {
    if(args[0].find(value)) {
      console.log('a');
      return true;
    }
  }

}
