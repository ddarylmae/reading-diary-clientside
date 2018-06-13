import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { MessageService } from './message.service';
import { User } from './user.model';
import { TokenStorage } from '../token.storage';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  private baseUrl = 'http://localhost:51956/api/useraccount';
  private user: User;

  constructor(private http: HttpClient,
    private token: TokenStorage,
    private router: Router,
    private messageService: MessageService) { }

  registerUser(user: User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<User>(this.baseUrl, user, httpOptions).pipe(
      tap((u: User) => this.log(`Added new user id:${u.Email}`)),
      catchError(this.handleError<User>('registerUser'))
    );
  }

  attemptAuth(user: User): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    console.log('attempAuth ::');
    return this.http.post(this.baseUrl + '/login', user, httpOptions);
  }

  logoutUser() {
    this.token.signOut();
    this.router.navigateByUrl('login');
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /**Log a MaterialService message with MessageService */
  private log(message: string) {
    this.messageService.add('MaterialService: ' + message);
  }

}
