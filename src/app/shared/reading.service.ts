import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Reading } from './reading.model';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class ReadingService {

  private apiUrl = 'http://localhost:51956/api/reading/';
  readingList: Reading[];
  currentReading: Reading;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /**
   * Gets list of readings from Web API
   */
  getAllReadings(): Observable<Reading[]> {
    this.messageService.add('MaterialService: Retrieved materials');
    return this.http.get<Reading[]>(this.apiUrl)
      .pipe(
        tap(reading => this.log(`Retrieved readings`)),
        catchError(this.handleError('getReadings', []))
      );
  }

  getReadingDetails(id: number): Observable<Reading> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Reading>(url).pipe(
      tap(_ => this.log(`Retrieved readingId=${id}`)),
      catchError(this.handleError<Reading>(`getReadingDetails id=${id}`))
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

  updateReading(reading: Reading): Observable<void> {
    // const url = `${this.apiUrl}/${reading.Id}`;
    const url = this.apiUrl + '' + reading.Id;
  
    console.log('object');
    console.log(reading);
  //  this.currentReading.Id=reading.Id;
    return this.http.put<void>(url, reading, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  
  deleteReading(reading: Reading): Observable<void> {
    // const url = `${this.apiUrl}/${reading.Id}`;
    const url = this.apiUrl + '' + reading.Id;
  
    console.log('object');
    console.log(reading);
  //  this.currentReading.Id=reading.Id;
    return this.http.delete<void>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


}
