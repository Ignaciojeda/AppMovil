import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { createClient } from '@supabase/supabase-js';
import { sha256 } from 'js-sha256';

interface Carrera {
  id_carrera: number;
  descripcion: string;
}


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  Usuario = {
    rut: '',
    nombre_completo: '',
    carrera: '',
    email: '',
    password: '',
    tipo_usuario: 2  // Usuario por defecto
  };
  carreras: Carrera[] = []; // Tipar el array carreras con la interfaz Carrera

  private supabase = createClient('https://rphpxwnpbulwhnhaapeu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwaHB4d25wYnVsd2huaGFhcGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2MzMzODMsImV4cCI6MjA0NTIwOTM4M30.w8vhc96ABfuEytJS3yt_e4k0WtgG-k-2iG4tiBWLbEc');

  constructor(private router: Router, private alertController: AlertController) {}

  ngOnInit() {
    this.loadCarreras();
  }

  async loadCarreras() {
    try {
      const { data, error } = await this.supabase.from('carrera').select('*');
      if (error) {
        throw error;
      }
      this.carreras = data as Carrera[]; // Convertir data al tipo Carrera[]
    } catch (error) {
      console.error('Error al cargar las carreras:', error);
    }
  }

  async Registrar() {
    try {
      // Validación del RUT
      const rutValido = /^[0-9]{7,8}-[0-9Kk]$/.test(this.Usuario.rut);
      if (!rutValido) {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Formato de RUT inválido. Debe ser en formato 12345678-9.',
          buttons: ['OK']
        });
        await alert.present();
        return;
      }

   
      const hashedPassword = sha256(this.Usuario.password);

     
      const { data, error } = await this.supabase
        .from('usuarios')
        .insert([{
          rut: this.Usuario.rut,
          nombre_completo: this.Usuario.nombre_completo,
          carrera: this.Usuario.carrera,
          correo: this.Usuario.email,
          contraseña: hashedPassword,  
          tipo_usuario: this.Usuario.tipo_usuario
        }]);

      if (error) {
        console.error('Error al insertar usuario en Supabase:', error.message);
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
      console.error('Detalle del error:', error);
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