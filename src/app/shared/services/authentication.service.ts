import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { User } from '../../modelos/user.modelo';
 
@Injectable()
export class AuthenticationService {
    public token: string;
    Dominio='localhost';
    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token && currentUser.data;
    }
    preURL='http://'+this.Dominio+':3000/users/user/login';
    
    login(Correo: string, Contra: string): Observable<boolean> {
      const newpres = JSON.stringify({ Correo: Correo, Contra: Contra });
      const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.preURL,newpres,{headers})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().id_token;
                let dataUser = response.json() && response.json().dataUser;
                console.log(dataUser.Status);
                if(dataUser.Status=='A'){
                if (token) {
                    // set token property
                    this.token = token;
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ Correo: Correo, token: token,dataUser: dataUser }));
                    console.log((JSON.parse(localStorage.getItem('currentUser'))));
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }}else{ return false; }
            }).catch((error: any) => {
              if (error.status === 500) {
                  return Observable.throw(new Error(error.status));
              }
              else if (error.status === 400) {
                  return Observable.throw(new Error(error.status));
              }
              else if (error.status === 409) {
                  return Observable.throw(new Error(error.status));
              }
              else if (error.status === 406) {
                  return Observable.throw(new Error(error.status));
              }
              else if (error.status === 401) {
                return Observable.throw(new Error(error.status));
            }
          });
    }
    getUser() {
        //console.log((JSON.parse(localStorage.getItem('currentUser'))));
        return (JSON.parse(localStorage.getItem('currentUser')));
      }
    
      /*reset(contraseña) {
        console.log("hola");
        const newpres = JSON.stringify(contraseña);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.registro, newpres, {headers}).map(res => { 
            return res;
          })
      }*/
      /*getToken(): string {
        return localStorage.getItem(this.authToken);
      }
       
      isLoggedId(): BehaviorSubject<boolean> {
        return this.loggedId$;
      }
      

*/
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}