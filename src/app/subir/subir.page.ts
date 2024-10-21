import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-subir',
  templateUrl: 'subir.page.html',
  styleUrls: ['subir.page.scss'],
})
export class SubirPage {

  constructor(private navCtrl: NavController) {}

  logout() {
    localStorage.removeItem('loggedInUser');
    this.navCtrl.navigateRoot('/login');
  }

  objectName: string = '';
  room: string = '';
  time: string = '';
  description: string = '';
  previewData: any = null;
  previewImage: string | ArrayBuffer | null | undefined = null;  // Cambiado aquí

  onSubmit() {
    this.previewData = {
      objectName: this.objectName,
      room: this.room,
      time: this.time,
      description: this.description
    };
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async takePicture() {
    const previewImage = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });



    // También actualiza previewImage para que se muestre en la vista previa
    this.previewImage = previewImage.webPath;

    // Actualiza previewData para incluir la información actual
    this.previewData = {
      objectName: this.objectName,
      room: this.room,
      time: this.time,
      description: this.description
    };
  }
}
