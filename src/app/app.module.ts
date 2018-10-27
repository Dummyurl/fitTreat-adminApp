import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {MatExpansionModule,MatToolbarModule, MatTabsModule,MatSnackBarModule,MatListModule, MatButtonModule, MatIconModule,MatGridListModule} from '@angular/material';
import { AppComponent } from './app.component';
import { TabsComponent } from './tabs/tabs.component';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouteTestComponent } from './route-test/route-test.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { LayoutModule } from '@angular/cdk/layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HomeComponent } from './home/home.component';
import { MasterDataTabModule } from './master-data-tab-module/master-data-tab-module.module';

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    RouteTestComponent,
    HomeComponent
  ],
  imports: [
    MasterDataTabModule,
    MatToolbarModule,
    MatTabsModule,
    MatListModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatSnackBarModule,
    AppRoutingModule,
    MatSidenavModule,
    LayoutModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatFormFieldModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
