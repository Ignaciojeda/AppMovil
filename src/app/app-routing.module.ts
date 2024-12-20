import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NoIngresado } from './guards/noingresado.guard';
import { Ingresado } from './guards/ingresado.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { 
    path: 'login', 
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
    canActivate: [NoIngresado]
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
    loadChildren: () => import('./objetos/objetos.module').then(m => m.ObjetosPageModule)
  },
  {
    path: 'subir',
    loadChildren: () => import('./subir/subir.module').then(m => m.SubirPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [Ingresado]
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./recuperar/recuperar.module').then(m => m.RecuperarPageModule)
  },
  {
    path: 'error',
    loadChildren: () => import('./error/error.module').then(m => m.ErrorPageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./historial/historial.module').then( m => m.HistorialPageModule)
  },
  {
    path: 'adminh',
    loadChildren: () => import('./adminh/adminh.module').then( m => m.AdminhPageModule)
  },
  {
    path: 'admintabs',
    loadChildren: () => import('./admintabs/admintabs.module').then( m => m.AdmintabsPageModule),
    canActivate: [Ingresado]
  },  {
    path: 'admino',
    loadChildren: () => import('./admino/admino.module').then( m => m.AdminoPageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
