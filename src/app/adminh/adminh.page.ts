import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';  // Importamos Leaflet para el mapa
import { supabase } from 'supabase.service';  // Importar el servicio de Supabase

@Component({
  selector: 'app-adminh',
  templateUrl: './adminh.page.html',
  styleUrls: ['./adminh.page.scss'],
})
export class AdminhPage implements OnInit {
  username: string = '';
  map: any;
  adminObjects: any[] = [];  // Lista de objetos perdidos para el administrador

  constructor(private navCtrl: NavController, private route: ActivatedRoute) {}

  ngOnInit() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  
    if (loggedInUser && loggedInUser.nombre_completo) {
      this.username = loggedInUser.nombre_completo;  // Usar el nombre del usuario almacenado
    }

    this.loadMap();
    this.loadAdminObjects();  // Cargar objetos perdidos
  }

  // Inicializa el mapa
  loadMap() {
    this.map = L.map('map').setView([-41.47010673020358, -72.92584076092523], 13);

    // Capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Agregar un marcador
    L.marker([-41.47010673020358, -72.92584076092523]).addTo(this.map)
      .bindPopup('Duoc UC, Sede Puerto Montt')
      .openPopup();
  }

  // Cargar objetos perdidos para el administrador
  async loadAdminObjects() {
    const { data, error } = await supabase
      .from('objetos_perdidos')
      .select('*');

    if (error) {
      console.error('Error loading objects:', error);
    } else {
      this.adminObjects = data || [];
    }
  }

  
  gotoobjetos() {
    this.navCtrl.navigateForward('/objetos');
  }


  gotosubir() {
    this.navCtrl.navigateForward('/subir');
  }


  logout() {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('isLoggedIn');
    this.navCtrl.navigateRoot('/login');
  }

  async deleteObject(objectId: number) {
    const { error } = await supabase
      .from('objetos_perdidos')
      .delete()
      .eq('id', objectId);

    if (error) {
      console.error('Error deleting object:', error);
    } else {
      console.log('Object deleted successfully');
      this.adminObjects = this.adminObjects.filter(obj => obj.id !== objectId);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.map.invalidateSize();
    }, 500);
  }
}
