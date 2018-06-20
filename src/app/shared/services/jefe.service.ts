import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class JefeService {
  Dominio='localhost';
  preURL='http://'+this.Dominio+':3000/Jefes/';
  change='http://'+this.Dominio+':3000/Jefes/changeStatus/'

  constructor(private http: Http,) { }
  postJefe(Jefe: any) {
    console.log("hola");
    const newpres = JSON.stringify(Jefe);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.preURL, newpres, {headers}).map(res => { 
        return res;
      })
  }
  putJefe(id$: any,Jefe: any) {
    console.log(id$,Jefe)
    const newpre = JSON.stringify(Jefe);
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
getJefe(id$) {
    //console.log(id$);
    var presURL=this.preURL+id$;
    // get users from api
    return this.http.get(presURL)
        .map(res => res.json());
}
getJefes() {
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
