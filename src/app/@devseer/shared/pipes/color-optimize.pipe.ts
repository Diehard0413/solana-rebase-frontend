import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorOptimize'
})
export class ColorOptimizePipe implements PipeTransform {
  colors = ['#fee4cb', '#ffd3e2', '#c8f7dc', '#d5deff', '#e9e7fd','#dbf6fd'];
  opColors = [
    {
      value: '#fee4cb',
      callbackColor: '#ff942e'
    },
    {
      value: '#ffd3e2',
      callbackColor: '#df3670'
    },
    {
      value: '#c8f7dc',
      callbackColor: '#34c471'
    },
    {
      value: '#d5deff',
      callbackColor: '#4067f9'
    },
    {
      value: '#e9e7fd',
      callbackColor: '#4f3ff0'
    },
    {
      value: '#dbf6fd',
      callbackColor: '#096c86'
    }
  ];
  transform(value: any, args?: any[]): string {
    return  this.opColors.find((color) => color.value === value).callbackColor;
  }

}
