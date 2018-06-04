import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class MaestroService {
  Dominio='localhost';
  preURL='http://'+this.Dominio+':3000/Maestros/';
  change='http://'+this.Dominio+':3000/Maestros/changeStatus/'

  constructor(private http: Http,) { }
  postMaestro(maestro: any) {
    console.log("hola");
    const newpres = JSON.stringify(maestro);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.preURL, newpres, {headers}).map(res => { 
        return res;
      })
  }
  putMaestro(id$: any,maestro: any) {
    console.log(id$,maestro)
    const newpre = JSON.stringify(maestro);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const url = this.preURL + id$;
    return this.http.put(url, newpre, {headers}).map(res => {
        console.log(res);
      //console.log(res.json());
      return true;
    })
  }
getMaestro(id$) {
    //console.log(id$);
    var presURL=this.preURL+id$;
    // get users from api
    return this.http.get(presURL)
        .map(res => res.json());
}
getMaestros() {
  //console.log(id$);
  var presURL=this.preURL;
  // get users from api
  return this.http.get(presURL)
      .map(res => res.json());
}
changeStatus(id$: any,status: any,) {
  console.log(id$,status)
   const headers = new Headers({
     'Content-Type': 'application/json'
   });
   const url = this.change + id$+'/'+status;
   return this.http.put(url,{headers}).map(res => {
       console.log(res);
     //console.log(res.json());
     return true;
   })
 }
}
