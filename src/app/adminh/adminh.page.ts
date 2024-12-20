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

    this.loadAdminObjects();  // Cargar objetos perdidos
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
  goToHistorial() {
    this.navCtrl.navigateForward('/historial');
  }

  gotoobjetosa() {
    this.navCtrl.navigateForward('/admino');
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
