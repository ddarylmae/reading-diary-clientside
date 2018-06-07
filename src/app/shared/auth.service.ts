import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { User } from './user.model';

@Injectable()
export class AuthService {

    private baseUrl = 'http://localhost:51956/api/useraccount';

    constructor(private http: HttpClient) {
    }

    login(user: User): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
          };
        return this.http.post<User>(this.baseUrl + '/login', user, httpOptions)
            .do(res => this.setSession);
            // .shareReplay();
    }

    private setSession(authResult) {
        const expiresAt = moment().add(authResult.expiresIn, 'second');

        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
    }

    logout() {
        console.log('authservice logout');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }

    isExpired() {
        const date = this.getExpiration();
        return (date === undefined) ? false : !(date.valueOf() > new Date().valueOf());
    }
}
