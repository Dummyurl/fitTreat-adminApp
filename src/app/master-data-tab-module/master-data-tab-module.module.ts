import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterDataModuleRoutingModule } from './master-data-module-routing.module';
import { MasterDataComponent } from './master-data-home/master-data-home.component';
import { MedicineCompComponent } from './medicine-comp/medicine-comp.component';
import { MealsComponent } from './meals/meals.component';
import {SymptomsComponent} from './symptoms/symptoms.component'
import { MasterDataService } from './master-data.service';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule,MatSortModule,MatInputModule,MatToolbarModule, MatSelectModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { FilterPipe } from '../filter.pipe';


@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MasterDataModuleRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    FormsModule,
  MatSelectModule
],
  declarations: [
    MasterDataComponent,
    MedicineCompComponent,
    MealsComponent,
    SymptomsComponent,
    FilterPipe
    ]
})
export class MasterDataTabModule { }
