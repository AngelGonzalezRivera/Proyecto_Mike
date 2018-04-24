import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { AuthenticationService } from '../../../shared/services/authentication.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    host: {
        '(window:resize)': 'onResize($event)'
      }
})
export class HeaderComponent implements OnInit {
    @Output() emitEvent:EventEmitter<boolean> = new EventEmitter<boolean>();
    estado:boolean = false;
    onResize(event){
        //console.log(window.innerWidth);
        if (window.innerWidth <= 992) {
            this.estado=true;
            this.emitEvent.emit(this.estado);      
            }
            else{
            this.estado=false;
            this.emitEvent.emit(this.estado); 
            }
      }
    usuario='';
    constructor(public authenticationService:AuthenticationService, private translate: TranslateService, public router: Router) {
        this.usuario=this.authenticationService.getUser().dataUser.Nombre+" "+this.authenticationService.getUser().dataUser.Apellido;
        console.log(this.usuario);
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992) {
                this.estado=true;
                this.emitEvent.emit(this.estado);      
                }
        });
    }
    ngOnInit() {
    }

    toggleSidebar() {
        this.estado=true;
        this.emitEvent.emit(this.estado); 
        const dom: any = document.querySelector('body');
        dom.classList.toggle('push-right');
        //document.getElementById("gg").style.display = "block";
        //this.estado=true;
       // console.log(this.childOne.gg); 
    }

    rltAndLtr() {
        this.estado=false;
        this.emitEvent.emit(this.estado); 
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
        //this.estado=false;
        //this.childOne.gg = this.estado; 
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

}
