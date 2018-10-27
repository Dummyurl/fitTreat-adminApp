import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { RouteTestComponent } from './route-test/route-test.component';
import { TabsComponent } from './tabs/tabs.component';
import { HomeComponent } from './home/home.component';

const routes:Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path: 'masterData',loadChildren: './master-data-tab-module/master-data-tab-module.module#MasterDataTabModule'}
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { 
}
