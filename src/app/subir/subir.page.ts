import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://rphpxwnpbulwhnhaapeu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwaHB4d25wYnVsd2huaGFhcGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2MzMzODMsImV4cCI6MjA0NTIwOTM4M30.w8vhc96ABfuEytJS3yt_e4k0WtgG-k-2iG4tiBWLbEc');

@Component({
  selector: 'app-subir',
  templateUrl: 'subir.page.html',
  styleUrls: ['subir.page.scss'],
})
export class SubirPage {
  objectName: string = '';
  room: string = '';
  time: string = '';
  description: string = '';
  previewImage: string | ArrayBuffer | null = null;

  constructor(private navCtrl: NavController) {}

  logout() {
    localStorage.removeItem('loggedInUser');
    this.navCtrl.navigateRoot('/login');
  }

  async onSubmit() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const userRut = loggedInUser.rut;

    if (!userRut) {
      alert('No se pudo obtener el rut del usuario. Intenta iniciar sesión nuevamente.');
      return;
    }

    if (!this.objectName || !this.room || !this.time || !this.description || !this.previewImage) {
      alert('Por favor completa todos los campos antes de enviar.');
      return;
    }

    try {
      const fileName = `images/${Date.now()}.png`;
      const imageBlob = await this.urlToBlob(this.previewImage as string);

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('imagenes')
        .upload(fileName, imageBlob);

      if (uploadError) {
        console.error('Error al subir la imagen al bucket:', uploadError);
        alert(`Error al subir la imagen al bucket: ${uploadError.message}`);
        return;
      }

      const { data: urlData } = supabase.storage.from('imagenes').getPublicUrl(fileName);
      const publicUrl = urlData?.publicUrl;

      if (!publicUrl) {
        console.error('No se pudo obtener la URL pública de la imagen');
        alert('No se pudo obtener la URL pública de la imagen');
        return;
      }

      const now = new Date();
      const formattedTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${this.time}:00`;

      const { error: insertError } = await supabase
        .from('objetos_perdidos')
        .insert([{
          nombre_objeto: this.objectName,
          sala_encontrada: this.room,
          hora_encontrada: formattedTime,
          descripcion: this.description,
          foto: publicUrl,
          rut_usuario: userRut,  // Incluimos el rut del usuario
          activo: true           // Aseguramos que activo esté en true
        }]);

      if (insertError) {
        console.error('Error al insertar datos en la tabla objetos_perdidos:', insertError);
        alert('Error al insertar datos en la tabla: ' + insertError.message);
        return;
      }

      alert('Objeto subido correctamente');
      this.navCtrl.navigateBack('/');
    } catch (error) {
      console.error('Error inesperado:', error);
      alert('No se pudo subir la imagen');
    }
  }

  async takePicture() {
    const previewImage = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });

    if (previewImage.webPath) {
      this.previewImage = previewImage.webPath;
    } else {
      console.error('No se pudo obtener la ruta de la imagen');
      this.previewImage = null;
    }
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

  async urlToBlob(url: string): Promise<Blob> {
    const response = await fetch(url);
    return await response.blob();
  }
}
