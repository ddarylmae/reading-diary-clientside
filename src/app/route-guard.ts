import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { TokenStorage } from './token.storage';

@Injectable()
export class RouteGuard implements CanActivate {

    constructor(
        private router: Router,
        private token: TokenStorage
    ) {}

    canActivate() {
        if (this.token.isTokenExpired()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}
