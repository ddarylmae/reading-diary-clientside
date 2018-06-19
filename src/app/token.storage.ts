import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { User } from './shared/user.model';

const TOKEN_KEY = 'AuthToken';

@Injectable()
export class TokenStorage {

  constructor() { }

  signOut() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.clear();
  }

  public saveToken(token: string) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  isLoggedIn() {
    return (this.getToken() ? true : false);
  }

  isTokenExpired() {
    const current_time = new Date().getTime() / 1000;
    const decoded = (this.isLoggedIn()) ? jwt_decode(this.getToken()) : null;
    return (decoded != null && decoded.exp > current_time) ? false : true;
  }

  getUserLoginDetails(): User {
    const userDetails = new User;
    const decoded = (this.isLoggedIn()) ? jwt_decode(this.getToken()) : null;
    if (decoded != null) {
      userDetails.Firstname = decoded.given_name;
      userDetails.Email = decoded.email;
      return userDetails;
    }
    return null;
  }
}
