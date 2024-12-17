import { Component, OnInit } from '@angular/core';
import { supabase } from 'supabase.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  historial: any[] = [];

  constructor() {}

  ngOnInit() {
    this.loadHistorial();
  }

  async loadHistorial() {
    try {
      const { data, error } = await supabase
        .from('historial')
        .select('id_historial, id_objeto, rut_usuario, entregado_a, hora_entrega');

      if (error) {
        console.error('Error al cargar el historial:', error);
        return;
      }

      const historialCompleto = await Promise.all(
        data.map(async (item) => {
          // Formatear la hora_entrega
          const formattedHoraEntrega = this.formatFecha(item.hora_entrega);

          const { data: usuarioData, error: usuarioError } = await supabase
            .from('usuarios')
            .select('nombre_completo, carrera')
            .eq('rut', item.entregado_a)
            .single();

          if (usuarioError) {
            console.error('Error al obtener datos del usuario:', usuarioError);
            return item;
          }

          const { data: carreraData, error: carreraError } = await supabase
            .from('carrera')
            .select('descripcion')
            .eq('id_carrera', usuarioData.carrera)
            .single();

          if (carreraError) {
            console.error('Error al obtener la descripción de la carrera:', carreraError);
            return item;
          }

          const { data: objetoData, error: objetoError } = await supabase
            .from('objetos_perdidos')
            .select('foto')
            .eq('id_objeto', item.id_objeto)
            .single();

          if (objetoError) {
            console.error('Error al obtener la foto del objeto:', objetoError);
          }

          return {
            ...item,
            usuario: {
              ...usuarioData,
              carrera_descripcion: carreraData.descripcion,
            },
            foto: objetoData?.foto,
            hora_entrega: formattedHoraEntrega, // Asignar la hora formateada
          };
        })
      );

      this.historial = historialCompleto;
    } catch (error) {
      console.error('Error al cargar el historial completo:', error);
    }
  }

  // Función para formatear la fecha
  formatFecha(fecha: string): string {
    const date = new Date(fecha);
    return date.toLocaleString('es-CL', { // Formato de fecha en español
      weekday: 'long', // Día de la semana
      year: 'numeric', // Año
      month: 'long', // Mes
      day: 'numeric', // Día
      hour: 'numeric', // Hora
      minute: 'numeric', // Minuto
      second: 'numeric', // Segundo
    });
  }
}
