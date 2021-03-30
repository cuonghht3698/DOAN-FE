import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
moment.locale('vi')
@Pipe({name: 'demgio'})
export class DemGio implements PipeTransform {
  transform(x: Date): any {
    let currentDate = moment(x).fromNow();
    console.log(currentDate);
    return currentDate;
  }
}
