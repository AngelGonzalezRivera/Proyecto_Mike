import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalificacionesComponent } from './calificaciones.component';

const routes: Routes = [
    { path: '', component: CalificacionesComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CalificacionesRoutingModule { }
