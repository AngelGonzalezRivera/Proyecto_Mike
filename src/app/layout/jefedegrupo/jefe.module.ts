import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {DataTableModule} from '../../../../node_modules/primeng/components/datatable/datatable';
import {InputTextModule} from '../../../../node_modules/primeng/components/inputtext/inputtext';
import {ToggleButtonModule} from '../../../../node_modules/primeng/components/togglebutton/togglebutton';
import {RadioButtonModule} from '../../../../node_modules/primeng/components/radiobutton/radiobutton';
import { JefeRoutingModule } from './jefe-routing.module';
import { JefeComponent } from './jefe.component';
import { PageHeaderModule } from './../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        JefeRoutingModule,
        PageHeaderModule,
        RadioButtonModule,
        DataTableModule,
        InputTextModule,
        ToggleButtonModule,
        FormsModule,
        NgbModule.forRoot(),  
        DataTableModule,
        InputTextModule,
        ToggleButtonModule
    ],
    declarations: [JefeComponent]
})
export class JefeModule { }
