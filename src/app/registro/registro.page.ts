import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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

  constructor(private router: Router, private alertController: AlertController) {}

  async Registrar() {
    const users = JSON.parse(localStorage.getItem('user') || '[]');
  
    const usuarioExistente = users.find((user: any) => user.username === this.Usuario.username);
  
    if (usuarioExistente) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Este usuario ya está registrado.',
        buttons: ['OK']
      });
      await alert.present();
    } else {
      users.push(this.Usuario);
      localStorage.setItem('user', JSON.stringify(users)); 
  
      const alert = await this.alertController.create({
        header: 'Registrado',
        message: 'Usuario registrado con éxito.',
        buttons: ['OK']
      });
      await alert.present();
  
      this.router.navigate(['/login']);
    }
  }
  
  

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
