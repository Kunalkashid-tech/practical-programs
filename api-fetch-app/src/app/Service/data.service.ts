import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  fetchUsers(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(data => console.log('Fetched data:', data)),  // Log fetched data
      map(users => users.filter(user => user.name.length > 5)), // Filter users with name length > 5
      map(users => users.map(user => ({ ...user, name: user.name.toUpperCase() }))) // Map to uppercase names
    );
  }
}
