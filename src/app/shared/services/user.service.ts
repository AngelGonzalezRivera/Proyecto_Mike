import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
 
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../../modelos/user.modelo';
 
@Injectable()
export class UserService {
    Dominio='localhost';
    preURL='http://'+this.Dominio+':3000/users/user/all/';
    preURL2='http://'+this.Dominio+':3000/users/user/permisos';
    registro='http://'+this.Dominio+':3000/users/user/create';
    baja='http://'+this.Dominio+':3000/users/user/delete/'
    user='http://'+this.Dominio+':3000/users/user/'
    update='http://'+this.Dominio+':3000/users/user/update/'
    change='http://'+this.Dominio+':3000/users/user/changeStatus/'
    urlforgot='http://'+this.Dominio+':3000/users/forgot'
    arr:any;
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }
    /*getClientes() {
        return this.http.get(this.presURL).map(res => res.json());
      }*/
      putUsuario(id$: any,usuario: any,) {
          console.log(id$,usuario)
        const newpre = JSON.stringify(usuario);
        const headers = new Headers({
          'Content-Type': 'application/json'
        });
        const url = this.update + id$;
        return this.http.put(url, newpre, {headers}).map(res => {
            console.log(res);
          //console.log(res.json());
          return true;
        })
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
    getUser(id$: any) {
        const url = this.user + id$;
        console.log(url);
        return this.http.get(url).map( res => res.json());
      }
    getUsers() {
        //console.log(id$);
        var presURL=this.preURL;
        // get users from api
        return this.http.get(presURL)
            .map(res => res.json());
    }
    getPermisos() {
        //console.log(id$);
        var presURL2=this.preURL2;
        // get users from api
        return this.http.get(presURL2)
            .map(res => res.json());
    }
    forgot(id$: any) {
      this.arr={
        Correo:id$
      };
      console.log(id$);
      const newpres = JSON.stringify(this.arr);
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.post(this.urlforgot, newpres, {headers}).map(res => { 
          return true;
        });
    }
    postUser(user: any) {
        console.log("hola");
        const newpres = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.registro, newpres, {headers}).map(res => { 
            return res;
          })
      }
      delUser(id$: any) {
        const url = this.baja + id$;
        return this.http.delete(url).map(res => {
            //return alert('Usuario Eliminado')
        });
      }    
}