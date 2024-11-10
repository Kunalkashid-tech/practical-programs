import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'assets/mock-data.json'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(data => console.log('Fetched data:', data)),
      map(data => data.filter(item => item.active)), // Example filter
      map(data => data.map(item => ({ ...item, name: item.name.toUpperCase() }))) // Example map
    );
  }
}
