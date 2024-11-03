import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { supabase } from 'supabase.service'; // Asegúrate de importar tu servicio de Supabase

@Component({
  selector: 'app-objetos',
  templateUrl: './objetos.page.html',
  styleUrls: ['./objetos.page.scss'],
})
export class ObjetosPage implements OnInit {
  objetos: any[] = []; // Arreglo para almacenar los objetos perdidos

  constructor(private navCtrl: NavController) {}

  // Función para cerrar sesión
  logout() {
    // Eliminar el usuario del localStorage
    localStorage.removeItem('loggedInUser');

    // Redirigir a la página de login
    this.navCtrl.navigateRoot('/login');
  }
  async ngOnInit() {
    await this.cargarObjetos(); // Cargar los objetos al inicializar la página
  }

  async cargarObjetos() {
    const { data, error } = await supabase
      .from('objetos_perdidos')
      .select('id, nombre_objeto, descripcion, foto'); // Ajusta los campos según tu base de datos
  
    if (error) {
      console.error('Error al cargar objetos:', error);
    } else {
      this.objetos = data; // Asigna los datos a la propiedad objetos
    }
  }
    
}

