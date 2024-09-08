import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

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

  constructor(private navCtrl: NavController, private alertController: AlertController) {}

  async Ingresar() {
    const users = JSON.parse(localStorage.getItem('user') || '[]');
    const user = users.find((user: any) =>
      user.username === this.Usuario.username && user.password === this.Usuario.password
    );

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      this.navCtrl.navigateForward('/tabs', {
        queryParams: { username: user.username }
      });
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Usuario o contraseña incorrectos. Por favor, verifica tus datos.',
        buttons: ['OK']
      });

      await alert.present();
    }
  }

  goToRegister() {
    this.navCtrl.navigateForward('/registro');
  }
}
