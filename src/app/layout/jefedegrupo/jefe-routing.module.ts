import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JefeComponent } from './jefe.component';

const routes: Routes = [
    { path: '', component: JefeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JefeRoutingModule { }
