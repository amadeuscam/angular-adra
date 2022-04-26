import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class BenGuardService implements CanActivate {

  realRol: string | undefined

  constructor(private tokenService: TokenService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const expectedRol = route.data['expectedRol'];
    this.realRol = this.tokenService.getIsAdmin() ? "admin" : "user";

    if (!this.tokenService.isLogged() || expectedRol.indexOf(this.realRol) < 0) {
      if (expectedRol.indexOf(this.realRol) < 0) {
        this.router.navigate(["/"]);
      } else {
        this.router.navigate(["/login"]);
      }

      return false;
    } else {
      return true;
    }






  }
}
