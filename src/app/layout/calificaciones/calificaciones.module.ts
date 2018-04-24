import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalificacionesRoutingModule } from './calificaciones-routing.module';
import { CalificacionesComponent } from './calificaciones.component';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [
        CommonModule,
        CalificacionesRoutingModule,
        PageHeaderModule
    ],
    declarations: [CalificacionesComponent]
})
export class CalificacionesModule { }
