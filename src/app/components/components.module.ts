import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { AlertComponent } from './alert/alert.component';
import { LoadingComponent } from './loading/loading.component';
import { ToastComponent } from './toast/toast.component';



@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    AlertComponent,
    LoadingComponent,
    ToastComponent
  ],

  exports: [
    HeaderComponent,
    MenuComponent,
    AlertComponent,
    LoadingComponent,
    ToastComponent
  ],

  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ]
})
export class ComponentsModule { }
