import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratioRoutes } from './administration-routing.module';
import { RouterModule } from '@angular/router';
import { LookupsModule } from './lookups/modules/lookups.module';
import { SharedComponentsModule } from 'app/shared/components/shared-components.module';
import { SharedMaterialModule } from 'app/shared/shared-material.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LookupsModule,
    SharedComponentsModule,
    SharedMaterialModule,
    RouterModule.forChild(AdministratioRoutes)
  ],
  exports:[
    CommonModule,
    LookupsModule,
    SharedComponentsModule,
    SharedMaterialModule,
  ]
})
export class AdministrationModule { }
