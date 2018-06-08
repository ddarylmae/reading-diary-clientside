import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// import * as moment from 'moment';
import { User } from './user.model';

@Injectable()
export class AuthService {

    private baseUrl = 'http://localhost:51956/api/useraccount';

    constructor(private http: HttpClient) {
    }

    logins(user: User): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        return this.http.post<any>(this.baseUrl + '/login', user, httpOptions)
            .do(res => this.modifySession);
            // .shareReplay();
    }

    signIn(user: User): Observable<any> {
        // const credentials = {Username: username, Password: password};
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        console.log('signIn ::');
        return this.http.post(this.baseUrl + '/login', user, httpOptions);
      }

    private modifySession(authResult) {
        // const expiresAt = moment().add(authResult.expiresIn, 'second');
        localStorage.setItem('id_token', authResult.idToken);
        // localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
        console.log(localStorage.getItem);
    }

    logout() {
        console.log('authservice logout');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
    }

    public isLoggedIn() {
        // return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration);
        // return moment(expiresAt);
    }

    isExpired() {
        const date = this.getExpiration();
        // const val = (date === undefined) ? false : !(date.valueOf() > new Date().valueOf());
        return false;
    }
}
