import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  credentials = {
    username: '',
    password: ''
  };

  constructor(private navCtrl: NavController) {}

  onLogin() {
    const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (this.credentials.username === savedUser.username && this.credentials.password === savedUser.password) {
      this.navCtrl.navigateForward('/home', {
        queryParams: { username: this.credentials.username }
      });
    } else {
      console.log('Credenciales incorrectas.');
    }
  }
  goToRegister() {
    this.navCtrl.navigateForward('/registro');
  }
}
