import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
moment.locale('vi')
@Pipe({name: 'demgio'})
export class DemGio implements PipeTransform {
  transform(x: Date): any {
    let loc = environment.gio;
    let currentDate = moment(x).add(loc,'hours').fromNow();
    return currentDate;
  }
}
