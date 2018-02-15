import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from "@angular/router";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private _auth:AuthService, private router: Router) { }

  canActivate( next:ActivatedRouteSnapshot, state: RouterStateSnapshot ){

    console.log(next);
    
    if (this._auth.isAuthenticated()) {
      console.log("Estás autentificado");
      return true;
    }
    else{
      console.error("Bloqueado, logueate!");
      this.router.navigate(['/login']);
      return false;
    }
  }
}
