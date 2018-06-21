import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class MateriaService {
  Dominio='localhost';
  preURL='http://'+this.Dominio+':3000/Materia/';
  change='http://'+this.Dominio+':3000/Materia/changeStatus/'

  constructor(private http: Http,) { }
  postMateria(Materia: any) {
    console.log("hola");
    const newpres = JSON.stringify(Materia);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.preURL, newpres, {headers}).map(res => { 
        return res;
      })
  }
  putMateria(id$: any,Materia: any) {
    console.log(id$,Materia)
    const newpre = JSON.stringify(Materia);
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
getMateria(id$) {
    //console.log(id$);
    var presURL=this.preURL+id$;
    // get users from api
    return this.http.get(presURL)
        .map(res => res.json());
}
getMaterias() {
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
