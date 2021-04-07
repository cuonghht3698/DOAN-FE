import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'getIndex' })
export class GetIndexPipe implements PipeTransform {
  transform(value: string, index?: number): string {
    if (value == null) {
      return '';
    }
    var s = value.split('-');
    var i = 0;
    if (!index) {
      return s[0];
    }
    if (index > s.length) {
      return s[s.length];
    }
    return s[index];
  }
}
