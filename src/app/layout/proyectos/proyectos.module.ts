import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProyectosRoutingModule } from './proyectos-routing.module';
import { ProyectosComponent } from './proyectos.component';
import { PageHeaderModule } from './../../shared';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {DataTableModule} from '../../../../node_modules/primeng/components/datatable/datatable';
import {InputTextModule} from '../../../../node_modules/primeng/components/inputtext/inputtext';
import {ToggleButtonModule} from '../../../../node_modules/primeng/components/togglebutton/togglebutton';

@NgModule({
    imports: [
        CommonModule,
        ProyectosRoutingModule,
        Ng2Charts,
        PageHeaderModule,
        ReactiveFormsModule,
        FormsModule,
        NgbModule.forRoot(),  
        DataTableModule,
        InputTextModule,
        ToggleButtonModule,
    ],
    declarations: [ProyectosComponent]
})
export class ProyectosModule { }
