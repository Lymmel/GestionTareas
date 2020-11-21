import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthConstants } from '../config/auth-constants';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  postData = {
    username: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private toastService: ToastService,
    private menuCtrl:MenuController
  ) {
    this.menuCtrl.enable(false, 'firstMenu');
  }

  ngOnInit() { }

  validateInputs() {
    console.log(this.postData);
    let username = this.postData.username.trim();
    let password = this.postData.password.trim();
    return (
      this.postData.username &&
      this.postData.password &&
      username.length > 0 &&
      password.length > 0
    );
  }

  loginAction() {
    if (this.validateInputs()) {
      this.authService.login(this.postData).subscribe(
        (res: any) => {
          if (res.userData) {
            // Storing the User data.
            this.storageService.store(AuthConstants.AUTH, res.userData);
            this.router.navigate(['tabs/tab2']);
          } else {
            this.toastService.presentToast('Incorrect username and password.');
          }
        },
        (error: any) => {
          this.toastService.presentToast('Network connection error.');
        }
      );
    } else {
      this.toastService.presentToast(
        'Please enter username or password.'
      );
    }
  }

  
}