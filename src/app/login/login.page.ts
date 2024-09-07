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
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const user = users.find((user: any) =>
      user.username === this.credentials.username && user.password === this.credentials.password
    );

    if (user) {
      this.navCtrl.navigateForward('/home', {
        queryParams: { username: user.username }
      });
    } else {
      console.log('Credenciales incorrectas.');
    }
  }

  // Agregar el método para redirigir al registro
  goToRegister() {
    this.navCtrl.navigateForward('/registro');
  }
}
