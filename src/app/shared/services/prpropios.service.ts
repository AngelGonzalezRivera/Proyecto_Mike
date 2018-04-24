import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class PrpropiosService {
  Dominio='localhost';
  preURL='http://'+this.Dominio+':3000/Prpropios';

  constructor(private http: Http,) { }
  getPrPropios() {
    //console.log(id$);
    var presURL=this.preURL;
    // get users from api
    return this.http.get(presURL)
        .map(res => res.json());
}
}
