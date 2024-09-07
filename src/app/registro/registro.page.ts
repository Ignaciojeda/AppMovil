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
      // Obtener los usuarios guardados en localStorage, o inicializar un array vacío
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Verificar si el usuario ya existe
      const userExists = users.some((user: any) => user.username === this.credentials.username);
      
      if (userExists) {
        console.log('El usuario ya está registrado.');
      } else {
        // Agregar el nuevo usuario al array de usuarios
        users.push(this.credentials);
        
        // Guardar el array actualizado en localStorage
        localStorage.setItem('users', JSON.stringify(users));
        
        // Redirigir al usuario a la página de login
        this.navCtrl.navigateForward('/login');
      }
    } else {
      console.log('Todos los campos son requeridos');
    }
  }  
}
