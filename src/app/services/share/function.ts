import { Injectable } from '@angular/core';
declare var require: any
@Injectable({
  providedIn:'root'
})
export class QueryParams {
  constructor() { }
  ConvertObjectToQueryString(objData){
    const queryString = require('query-string');
    const stringified = queryString.stringify(objData);
    return stringified;
  }
}
