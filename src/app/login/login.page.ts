import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  Usuario = {
    username: '',
    password: ''
  };

  constructor(private navCtrl: NavController) {}

  Ingresar() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const user = users.find((user: any) =>
      user.username === this.Usuario.username && user.password === this.Usuario.password
    );

    if (user) {
      this.navCtrl.navigateForward('/tabs', {
        queryParams: { username: user.username }
      });
    } else {
      console.log('Credenciales incorrectas.');
    }
  }

  goToRegister() {
    this.navCtrl.navigateForward('/registro');
  }
}
