import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from "../shared/components//header/header.component";
import { SidebarComponent } from "../shared/components//sidebar/sidebar.component";
@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    @ViewChild('child1') childOne:HeaderComponent;
    @ViewChild('child2') childTwo:SidebarComponent;
  
    constructor(public router: Router) { }

    ngOnInit() {
        this.childOne.emitEvent
    .subscribe(
      res =>
      {
      //console.log("Atributo:" + res);
      this.childTwo.dataShared = res;
      }
    );
        if (this.router.url === '/') {
            this.router.navigate(['/dashboard']);
        }
    }

}
