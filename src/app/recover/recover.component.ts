import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
import { UserService } from '../shared/services/user.service';

@Component({
    selector: 'app-recover',
    templateUrl: './recover.component.html',
    styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';
    constructor(private router: Router,
        private us: UserService) { }

    ngOnInit() { }
    recover() {
        this.loading = true;
        this.us.forgot(this.model.email)
            .subscribe(result => {
            console.log(result);
            if (result){
                this.router.navigate(['/login']);
            }
            });
    }
}
