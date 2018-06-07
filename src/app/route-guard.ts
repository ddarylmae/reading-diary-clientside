import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './shared/auth.service';

@Injectable()
export class RouteGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    canActivate() {
        if (!this.authService.isExpired()) {
            return true;
        }
        this.router.navigate(['login']);
        return false;
    }
}
