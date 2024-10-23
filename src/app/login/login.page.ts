import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { supabase } from 'supabase.service' 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  Usuario = {
    email: '',
    password: ''
  };

  constructor(private navCtrl: NavController, private alertController: AlertController) {}

  async Ingresar() {
    // Consultar la base de datos para verificar si el usuario existe
    const { data: users, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('email', this.Usuario.email)
      .eq('password', this.Usuario.password);
  
    if (users && users.length > 0) {
      const user = users[0];
  
      // Almacenar los detalles del usuario en localStorage
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      localStorage.setItem('isLoggedIn', 'true'); // Indicador de sesión activa
  
      // Navegar a la página de inicio y pasar el nombre como parámetro
      this.navCtrl.navigateForward('/tabs', {
        queryParams: { username: user.nombre } // Cambiamos para enviar el nombre
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
