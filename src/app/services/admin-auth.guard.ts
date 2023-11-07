import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { LoginService } from './login.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router, private userService: UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.loginService.isLoggedIn()) {
      return this.userService.obtenerRol(this.loginService.getUser().dni).pipe(map((role: any) => {
        if (role.Role === 'ADMIN') {
          return true;
        }
        this.router.navigate(['nosotros']);
        return false;
      }));
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
  
}
