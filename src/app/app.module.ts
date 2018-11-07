import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {MatTableModule,MatExpansionModule,MatToolbarModule, MatTabsModule,MatSnackBarModule,MatListModule, MatButtonModule, MatIconModule,MatGridListModule} from '@angular/material';
import { AppComponent } from './app.component';
import { TabsComponent } from './tabs/tabs.component';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import { LayoutModule } from '@angular/cdk/layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HomeComponent } from './home/home.component';
import { MasterDataTabModule } from './master-data-tab-module/master-data-tab-module.module';
import { NgxPopper } from 'angular-popper';
import {BsDropdownModule} from 'ngx-bootstrap';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    HomeComponent,
  ],
  imports: [
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    MasterDataTabModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatSnackBarModule,
    AppRoutingModule,
    LayoutModule,
    MasterDataTabModule,
    NgxPopper
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
