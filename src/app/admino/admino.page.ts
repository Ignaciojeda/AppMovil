import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { supabase } from 'supabase.service'; // Asegúrate de importar tu servicio de Supabase

@Component({
  selector: 'app-admino',
  templateUrl: './admino.page.html',
  styleUrls: ['./admino.page.scss'],
})
export class AdminoPage implements OnInit {
  objetos: any[] = [];
  historial: any[] = [];

  constructor(private navCtrl: NavController, private alertCtrl: AlertController) {}

  async ngOnInit() {
    await this.cargarObjetos();
    await this.cargarHistorial();
  }

  async cargarObjetos() {
    const { data, error } = await supabase
      .from('objetos_perdidos')
      .select('id_objeto, nombre_objeto, descripcion, foto, activo')
      .eq('activo', true);

    if (error) {
      console.error('Error al cargar objetos:', error);
    } else {
      this.objetos = data;
    }
  }

  async cargarHistorial() {
    const { data, error } = await supabase
      .from('Historial')
      .select(`
        id_objeto,
        entregado_a,
        fecha_entrega,
        usuarios:entregado_a (nombre, carrera)
      `);

    if (error) {
      console.error('Error al cargar historial:', error);
    } else {
      this.historial = data;
    }
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.navCtrl.navigateRoot('/login');
  }

  async entregarObjeto(id_objeto: number) {
    const alert = await this.alertCtrl.create({
      header: 'Entregar Objeto',
      inputs: [
        {
          name: 'rut',
          type: 'text',
          placeholder: 'Ingrese el RUT del receptor',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Entrega cancelada');
            return true;
          },
        },
        {
          text: 'Entregar',
          handler: async (data) => {
            if (!data.rut) {
              console.error('Debe ingresar un RUT válido.');
              return false;
            }
  
            // 1. Buscar los datos del usuario por su RUT
            const { data: usuario, error: usuarioError } = await supabase
              .from('usuarios')
              .select('nombre, carrera')
              .eq('rut', data.rut)
              .single();
  
            if (usuarioError || !usuario) {
              console.error('Error al buscar el usuario con ese RUT:', usuarioError);
              return false;
            }
  
            // 2. Insertar en el historial
            const { error: historialError } = await supabase
              .from('Historial')
              .insert({
                id_objeto,
                rut_usuario: data.rut, // RUT de la persona a la que se entrega
                entregado_a: data.rut, // Redundante si quieres usarlo
                sala_encontrada: this.objetos.find((objeto) => objeto.id_objeto === id_objeto)?.sala_encontrada,
                descripcion: this.objetos.find((objeto) => objeto.id_objeto === id_objeto)?.descripcion,
                activo: false, // Marcar como no activo
              });
  
            if (historialError) {
              console.error('Error al insertar en el historial:', historialError);
              return false;
            }
  
            // 3. Actualizar el objeto como no activo
            const { error: objetoError } = await supabase
              .from('objetos_perdidos')
              .update({ activo: false })
              .eq('id_objeto', id_objeto);
  
            if (objetoError) {
              console.error('Error al actualizar estado del objeto:', objetoError);
              return false;
            }
  
            // 4. Actualizar listas locales
            this.objetos = this.objetos.filter((objeto) => objeto.id_objeto !== id_objeto);
            await this.cargarHistorial();
  
            console.log(`Objeto con id ${id_objeto} entregado y desactivado.`);
            return true;
          },
        },
      ],
    });
  
    await alert.present();
  }
}  
