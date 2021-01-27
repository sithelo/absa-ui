import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { Entry } from '../../core/model/entry';
import { DataServiceError } from './data-error.service';
import { environment } from '../../../environments/environment';
import { Phonebook } from '../../core/model/phonebook';

@Injectable()
export class EntryDataService {

  apiUrlBase = environment.apiUrlBase;

  constructor(private http: HttpClient) {}

  getEntries(): Observable<Entry[]> {
    return this.http.get<Entry[]>(`${this.apiUrlBase}/entry/all`)
    .pipe(
      catchError(this.handleError())
    );
  }

  getEntry(entryId: string): Observable<Entry> {
    return this.http.get<Entry>(`${this.apiUrlBase}/entry/${entryId}`)
    .pipe(
      catchError(this.handleError())
    );
  }

  addEntry(entry: Entry): Observable<Entry> {
    const data = { name: entry.name, phonenumber: entry.phonenumber, phonebookId: entry.phonebookId};
    return this.http.post<Entry>(`${this.apiUrlBase}/entry/`, data)
    .pipe(
      catchError(this.handleError(entry))
    );
  }

  deleteEntry(entry: Entry): Observable<Entry> {
    return this.http.delete(`${this.apiUrlBase}/entries/${entry.entryId}`)
    .pipe(
      map(() => entry),
      catchError(this.handleError(entry))
    );
  }

  updateEntry(entry: Entry): Observable<Entry> {
    const data = {
      entryId: entry.entryId,
      name: entry.name,
      phonenumber: entry.phonenumber,
       phonebookId: entry.phonebookId
      };
    return this.http.put<Entry>(`${this.apiUrlBase}/entry`, data)
    .pipe(
      map(() => entry),
      catchError(this.handleError(entry))
    );
  }

  getPhonebooks(): Observable<Phonebook[]> {
    return this.http.get<Phonebook[]>(`${this.apiUrlBase}/phonebook/all`)
    .pipe(
      catchError(this.handleError())
    );
  }

  private handleError<T>(requestData?: T) {
    return (res: HttpErrorResponse) => {
      const error = new DataServiceError(res.error, requestData);
      console.error(error);
      // return new ErrorObservable(error);
      return throwError(error);
    };
  }
}
