import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecoverComponent } from './recover.component';

const routes: Routes = [
    { path: '', component: RecoverComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecoverRoutingModule { }
