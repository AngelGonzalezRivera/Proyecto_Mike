import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class GrupoService {
  Dominio='localhost';
  preURL='http://'+this.Dominio+':3000/Grupo/';
  change='http://'+this.Dominio+':3000/Grupo/changeStatus/'

  constructor(private http: Http,) { }
  postGrupo(Grupo: any) {
    console.log("hola");
    const newpres = JSON.stringify(Grupo);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.preURL, newpres, {headers}).map(res => { 
        return res;
      })
  }
  putGrupo(id$: any,Grupo: any) {
    console.log(id$,Grupo)
    const newpre = JSON.stringify(Grupo);
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
getGrupo(id$) {
    //console.log(id$);
    var presURL=this.preURL+id$;
    // get users from api
    return this.http.get(presURL)
        .map(res => res.json());
}
getGrupos() {
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
