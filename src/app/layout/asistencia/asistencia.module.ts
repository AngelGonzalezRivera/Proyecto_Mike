import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsistenciaComponent } from './asistencia.component';
import { AsistenciaRoutingModule } from './asistencia-routing.module';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [
        CommonModule,
        AsistenciaRoutingModule,
        PageHeaderModule
    ],
    declarations: [AsistenciaComponent]
})
export class AsistenciaModule { }
