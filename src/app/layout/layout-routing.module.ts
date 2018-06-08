import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'usuarios', loadChildren: './usuarios/usuarios.module#UsuariosModule' },
            { path: 'asistencia', loadChildren: './asistencia/asistencia.module#AsistenciaModule' },
            { path: 'catalogos', loadChildren: './catalogos/catalogos.module#CatalogosModule' },
            { path: 'proyectos', loadChildren: './proyectos/proyectos.module#ProyectosModule' },
            { path: 'calificaciones', loadChildren: './calificaciones/calificaciones.module#CalificacionesModule' },
            { path: 'reportes', loadChildren: './reportes/reportes.module#ReportesModule' },
            { path: 'maestro', loadChildren: './maestro/maestro.module#MaestroModule' },
            { path: 'carrera', loadChildren: './carrera/carrera.module#CarreraModule' },
            { path: 'curso', loadChildren: './curso/curso.module#CursoModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
