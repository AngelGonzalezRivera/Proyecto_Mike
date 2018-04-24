import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { AuthenticationService } from '../../../shared/services/authentication.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    @Input() dataShared:boolean = false;
    isActive = false;
    showMenu = '';
    usuario='';

    constructor(public authenticationService:AuthenticationService){
        this.usuario=this.authenticationService.getUser().dataUser.Nombre+" "+this.authenticationService.getUser().dataUser.Apellido;

    }
    oculta(){
        const dom: any = document.querySelector('body');
        dom.classList.toggle('push-right');
    }
    toggleSidebar() { 
        const dom: any = document.querySelector('body');
        dom.classList.toggle('push-right');
        //document.getElementById("gg").style.display = "block";
        //this.estado=true;
       // console.log(this.childOne.gg); 
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
        //this.estado=false;
        //this.childOne.gg = this.estado; 
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }
    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }
    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }
}
