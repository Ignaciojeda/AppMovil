import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  username: string = '';

  constructor(private navCtrl: NavController, private route: ActivatedRoute) {}

  ngOnInit() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

    if (loggedInUser && loggedInUser.username) {
      this.username = loggedInUser.username;
    } else {
      this.route.queryParams.subscribe(params => {
        if (params['username']) {
          this.username = params['username'];
        }
      });
    }
  }
  logout() {
    localStorage.removeItem('loggedInUser');
    this.navCtrl.navigateRoot('/login');
  }
  gotoobjetos() {
    this.navCtrl.navigateForward('/objetos');
  }
  gotosubir() {
    this.navCtrl.navigateForward('/subir');
  }
}
