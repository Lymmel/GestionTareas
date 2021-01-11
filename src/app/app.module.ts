import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from  '@angular/common/http';
import { ComponentsModule } from './components/components.module';
import { LoadingComponent } from './components/loading/loading.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from './components/toast/toast.component';

import { ClientdetailsModalPageModule } from './clientdetails-modal/clientdetails-modal.module';

import { ClientdetailsModalPage } from './clientdetails-modal/clientdetails-modal.page';
import { AlertComponent } from './components/alert/alert.component';
import { IonicSelectableModule } from 'ionic-selectable';
import { CalendarstorageService } from './services/calendarstorage.service';
import { Storage } from '@ionic/storage'
import {IonicStorageModule} from '@ionic/storage';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule, 
    ComponentsModule,
    IonicStorageModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    IonicSelectableModule
  ],
  exports:[
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LoadingComponent,
    ToastComponent,
    AlertComponent,
    CalendarstorageService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

