import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserData, ApiResponse } from '../interfaces';
@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private apiUrl = 'src/assets/mock-user-data.json';


  private dataUrl = 'assets/mock-user-data.json'; // Make sure this path is correct

  constructor(private http: HttpClient) {}

  getUserData(): Observable<any> {
    return this.http.get<any>(this.dataUrl);
  }
}
