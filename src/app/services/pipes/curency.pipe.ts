import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'tiente'})
export class TienTePipe implements PipeTransform {
  transform(x: number, exponent?: number): any {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(".");
  }
}