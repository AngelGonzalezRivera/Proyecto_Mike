import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogosRoutingModule } from './catalogos-routing.module';
import { CatalogosComponent } from './catalogos.component';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [
        CommonModule,
        CatalogosRoutingModule,
        PageHeaderModule
    ],
    declarations: [CatalogosComponent]
})
export class CatalogosModule { }
