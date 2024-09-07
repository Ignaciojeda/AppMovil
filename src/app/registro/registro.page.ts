import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  Usuario = {
    username: '',
    password: ''
  };

  constructor(private navCtrl: NavController) {}

  Registrar() {
    if (this.Usuario.username && this.Usuario.password) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      const userExists = users.some((user: any) => user.username === this.Usuario.username);

      if (userExists) {
        console.log('El usuario ya está registrado.');
      } else {
        users.push(this.Usuario);
        localStorage.setItem('users', JSON.stringify(users));
        this.navCtrl.navigateForward('/login');
      }
    } else {
      console.log('Todos los campos son requeridos');
    }
  }

  goToLogin() {
    this.navCtrl.navigateForward('/login');
  }
}
