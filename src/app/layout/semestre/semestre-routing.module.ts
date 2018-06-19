import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SemestreComponent } from './semestre.component';

const routes: Routes = [
    { path: '', component: SemestreComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SemestreRoutingModule { }
