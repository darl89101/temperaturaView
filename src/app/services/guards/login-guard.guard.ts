import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor(private service: UsuarioService,
    private router: Router) {}

  canActivate(): boolean {
    if (this.service.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      console.log('Bloqueado por el GUARD');
      return false;
    }
  }
}
