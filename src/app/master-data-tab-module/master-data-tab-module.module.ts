import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterDataModuleRoutingModule } from './master-data-module-routing.module';
import { MasterDataComponent } from './master-data-home/master-data-home.component';
import { MedicineCompComponent } from './medicine-comp/medicine-comp.component';
import { MealsComponent } from './meals/meals.component';
import {SymptomsComponent} from './symptoms/symptoms.component'


@NgModule({
  imports: [
    CommonModule,
    MasterDataModuleRoutingModule
  ],
  declarations: [
    MasterDataComponent,
    MedicineCompComponent,
    MealsComponent,
    SymptomsComponent
  ]
})
export class MasterDataTabModule { }
