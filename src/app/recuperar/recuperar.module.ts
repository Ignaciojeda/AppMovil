import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RecuperarPage } from './recuperar.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: RecuperarPage }]),
  ],
  declarations: [RecuperarPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class RecuperarPageModule {}
