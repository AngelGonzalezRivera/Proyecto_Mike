import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { PageHeaderModule } from '../../shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {DataTableModule} from '../../../../node_modules/primeng/components/datatable/datatable';
import {InputTextModule} from '../../../../node_modules/primeng/components/inputtext/inputtext';
import {ToggleButtonModule} from '../../../../node_modules/primeng/components/togglebutton/togglebutton';
@NgModule({
    imports: [
        CommonModule,
        Ng2Charts,
        UsuariosRoutingModule,
        PageHeaderModule,
        ReactiveFormsModule,
        FormsModule,
        NgbModule.forRoot(),  
        DataTableModule,
        InputTextModule,
        ToggleButtonModule,
    ],
    declarations: [UsuariosComponent]
})
export class UsuariosModule { }
