import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
// import * as jwt_decode from 'jwt-decode';

// export const TOKEN_NAME = 'jwt_token';

@Injectable()
export class LoginService {


  private url = 'http://localhost:51956/api/useraccount/login';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  // getToken(): string {
  //   return localStorage.getItem(TOKEN_NAME);
  // }

  // setToken(token: string): void {
  //   localStorage.setItem(TOKEN_NAME, token);
  // }

  // getTokenExpirationDate(token: string): Date {
  //   const decoded = jwt_decode(token);
  //   if (decoded.exp === undefined) {
  //     return null;
  //   }
  //   const date = new Date(0);
  //   date.setUTCSeconds(decoded.exp);
  //   return date;
  // }

  // isTokenExpired(token?: string): boolean {
  //   if (!token) {
  //     token = this.getToken();
  //   }
  //   if (!token) {
  //     return true;
  //   }
  //   const date = this.getTokenExpirationDate(token);
  //   return (date === undefined) ? false : !(date.valueOf() > new Date().valueOf());
  // }

  // login(user): Promise<string> {
  //   return this.http
  //     .post(`${this.url}/login`, JSON.stringify(user), { headers: this.headers })
  //     .toPromise()
  //     .then(res => res.toString());
  // }

}
