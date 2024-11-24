import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { supabase } from 'supabase.service'; // Ajusta la ruta según la ubicación de tu archivo

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  historial: any[] = []; // Propiedad para almacenar los datos del historial

  constructor() {}

  ngOnInit() {
    this.loadHistorial();
  }
 
  

  async loadHistorial() {
    const { data, error } = await supabase
      .from('historial')
      .select('*'); // Ajusta los campos si es necesario

    if (error) {
      console.error('Error al cargar el historial:', error);
    } else {
      this.historial = data || []; // Asignamos los datos obtenidos a la propiedad historial
    }
    
  }
  
}
