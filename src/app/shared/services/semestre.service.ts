import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class SemestreService {
  Dominio='localhost';
  preURL='http://'+this.Dominio+':3000/Semestre/';
  change='http://'+this.Dominio+':3000/Semestre/changeStatus/'

  constructor(private http: Http,) { }
  postSemestre(Semestre: any) {
    console.log("hola");
    const newpres = JSON.stringify(Semestre);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.preURL, newpres, {headers}).map(res => { 
        return res;
      })
  }
  putSemestre(id$: any,Semestre: any) {
    console.log(id$,Semestre)
    const newpre = JSON.stringify(Semestre);
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
getSemestre(id$) {
    //console.log(id$);
    var presURL=this.preURL+id$;
    // get users from api
    return this.http.get(presURL)
        .map(res => res.json());
}
getSemestres() {
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
