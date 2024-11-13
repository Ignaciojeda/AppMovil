import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Ingresado } from './guards/ingresado.guard'; // Importa el guard para usuarios logueados
import { NoIngresado } from './guards/noingresado.guard'; // Importa el nuevo guard para usuarios no logueados

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { 
    path: 'login', 
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule), 
    canActivate: [NoIngresado] // Aplica el guard NoIngresado
  },
  { 
    path: 'home', 
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) 
  },
  { 
    path: 'registro', 
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule) 
  },
  {
    path: 'objetos',
    loadChildren: () => import('./objetos/objetos.module').then(m => m.ObjetosPageModule),
    canActivate: [Ingresado] // Aplica el guard Ingresado
  },
  {
    path: 'subir',
    loadChildren: () => import('./subir/subir.module').then(m => m.SubirPageModule),
    canActivate: [Ingresado] // Aplica el guard Ingresado
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [Ingresado] // Aplica el guard Ingresado
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./recuperar/recuperar.module').then(m => m.RecuperarPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./error/error.module').then(m => m.ErrorPageModule)
  },  {
    path: 'home-admin',
    loadChildren: () => import('./home-admin/home-admin.module').then( m => m.HomeAdminPageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./historial/historial.module').then( m => m.HistorialPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
