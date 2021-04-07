import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
 */
@Pipe({ name: 'substr' })
export class SubStringPipe implements PipeTransform {
  transform(value: string, number?: number): string {
    let num = number ? number : 150;
    return value.substring(0, num);
  }
}
