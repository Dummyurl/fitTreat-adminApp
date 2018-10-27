import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MasterDataComponent} from './master-data-home/master-data-home.component'
import { MedicineCompComponent } from './medicine-comp/medicine-comp.component';
import { MealsComponent } from './meals/meals.component';
import { SymptomsComponent } from './symptoms/symptoms.component';

const routes:Routes = [
  {path:'masterData',component:MasterDataComponent,
    children:[
      {path:'',redirectTo:'medicines',pathMatch:'full'},
      {
        path:'medicines',
        component:MedicineCompComponent
      },
      {
        path:'meals',
        component:MealsComponent
      },
      {
        path:'symptoms',
        component:SymptomsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterDataModuleRoutingModule { }
