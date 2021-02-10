import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router){

  }

  canActivate(
    next: ActivatedRouteSnapshot, // nex route user want to enter, state is the current state
    state: RouterStateSnapshot):  boolean  {
    if(!this.auth.isLoggedIn()){
      this.router.navigateByUrl('/login');
    }
    return true;
  }
  
}
