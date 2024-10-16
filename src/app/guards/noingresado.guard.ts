import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NoIngresado implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const isLoggedIn = !!localStorage.getItem('isLoggedIn'); // Verifica si el usuario está logueado

    // Si el usuario ya está logueado
    if (isLoggedIn) {
      // Redirige a la página de home
      return this.router.createUrlTree(['tabs/home']); // Cambia '/home' por la ruta de tu página principal
    } else {
      return true; // Permite el acceso a la página de login
    }
  }
}
