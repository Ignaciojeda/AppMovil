import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Ingresado } from './guards/ingresado.guard'; // Importa tu guard aquí

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'registro', loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule) },
  {
    path: 'objetos',
    loadChildren: () => import('./objetos/objetos.module').then(m => m.ObjetosPageModule),
    canActivate: [Ingresado] // Cambia el nombre del guard aquí
  },
  {
    path: 'subir',
    loadChildren: () => import('./subir/subir.module').then(m => m.SubirPageModule),
    canActivate: [Ingresado] // Cambia el nombre del guard aquí
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [Ingresado] // Cambia el nombre del guard aquí
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
