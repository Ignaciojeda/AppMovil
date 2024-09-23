import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-objetos',
  templateUrl: './objetos.page.html',
  styleUrls: ['./objetos.page.scss'],
})
export class ObjetosPage {

  constructor(private navCtrl: NavController) {}

  logout() {
    localStorage.removeItem('loggedInUser');
    this.navCtrl.navigateRoot('/login');
  }
}
