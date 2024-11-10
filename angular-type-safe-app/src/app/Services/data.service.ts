import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';  // Example API URL

  constructor(private http: HttpClient) {}

  // Get data from API and ensure type safety with ApiResponse
  getUserData(payload: ApiRequestPayload): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/${payload.userId}`);
  }
}

// Define interfaces for API requests and responses
export interface ApiResponse {
  name: string;
  age: number;
}

export interface ApiRequestPayload {
  userId: number;
}

