import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { createClient } from '@supabase/supabase-js';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  Usuario = {
    nombre: '',
    email: '',
    password: '',
    tipo_usuario: 'estudiante' 
  };

  private supabase = createClient('https://rphpxwnpbulwhnhaapeu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwaHB4d25wYnVsd2huaGFhcGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2MzMzODMsImV4cCI6MjA0NTIwOTM4M30.w8vhc96ABfuEytJS3yt_e4k0WtgG-k-2iG4tiBWLbEc');

  constructor(private router: Router, private alertController: AlertController) {}

  async Registrar() {
    try {
      const { data, error } = await this.supabase.from('usuarios').insert([this.Usuario]);

      if (error) {
        throw error;
      }

      const alert = await this.alertController.create({
        header: 'Registrado',
        message: 'Usuario registrado con éxito.',
        buttons: ['OK']
      });
      await alert.present();
      this.router.navigate(['/login']);
      
    } catch (error) {
      // Muestra el mensaje de error si el registro falla
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Este usuario ya está registrado o hubo un problema con el registro.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}