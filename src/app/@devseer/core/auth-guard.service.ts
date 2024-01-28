import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication-service.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    public authenticationService: AuthenticationService
      ) {}

  canActivate(): boolean {
    if(this.authenticationService.isAuthenticated() !== undefined) {
      return this.authenticationService.isAuthenticated();
    }
  }

}
