import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Category } from './category.model';
import { MessageService } from './message.service';


@Injectable()
export class CategoryService {

  private apiUrl = 'http://localhost:51956/api/categories/';
  categoryList: Category[];

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /**
   * Gets list of categories from Web API
   */
  getAllCategories(): Observable<Category[]> {
    this.messageService.add('MaterialService: Retrieved materials');
    return this.http.get<Category[]>(this.apiUrl)
      .pipe(
        tap(categories => this.log(`Retrieved categories`)),
        catchError(this.handleError('getCategories', []))
      );
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

  /**
   * Log a MaterialService message with MessageService
   */
  private log(message: string) {
    this.messageService.add('MaterialService: ' + message);
  }

}
