import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  credentials = {
    username: '',
    password: ''
  };

  constructor(private navCtrl: NavController) {}

  onRegister() {
    if (this.credentials.username && this.credentials.password) {
      localStorage.setItem('user', JSON.stringify(this.credentials));
      this.navCtrl.navigateForward('/login');
    } else {
      console.log('Todos los campos son requeridos');
    }
  }
}
