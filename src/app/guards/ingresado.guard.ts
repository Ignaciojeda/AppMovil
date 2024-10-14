import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Ingresado implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const isLoggedIn = !!localStorage.getItem('isLoggedIn'); // Lógica para verificar si el usuario está logueado

    if (isLoggedIn) {
      return true; // Permite el acceso
    } else {
      // Si no está logueado, redirige a la página de login
      return this.router.createUrlTree(['/login']);
    }
  }
}
