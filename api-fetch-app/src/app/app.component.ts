import { Component, OnInit } from '@angular/core';
import { DataService } from './Service/data.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'api-fetch-app';

  users$: Observable<any> | undefined;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.users$ = this.dataService.fetchUsers();
  }
}
