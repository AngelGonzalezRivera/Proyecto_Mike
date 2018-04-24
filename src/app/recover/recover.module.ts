import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecoverRoutingModule } from './recover-routing.module';
import { RecoverComponent } from './recover.component';
import { FormsModule }    from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RecoverRoutingModule,
    FormsModule
  ],
  declarations: [RecoverComponent]
})
export class RecoverModule { }
