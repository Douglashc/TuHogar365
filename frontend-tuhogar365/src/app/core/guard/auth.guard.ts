import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '@core/authentication/authentication.service';

import { TokenStorageService } from '@core/authentication/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard  {

  user: any;


  constructor(private authService: AuthenticationService, private router: Router, 
    private tokenStorageService: TokenStorageService
    
    ) {}

  // eslint-disable-next-line   @typescript-eslint/no-unused-vars
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.user = this.tokenStorageService.getUser();

    if (this.user.username) {
      return true;
    }
    this.router.navigate(['/authentication/signin']);
    return false;
  }
}
