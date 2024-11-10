import { Component, Input, OnInit } from '@angular/core';
import { DataService, ApiRequestPayload, ApiResponse } from 'src/app/Services/data.service';

export interface InputData {
  name: string;
  age: number;
}

@Component({
  selector: 'app-input-display',
  templateUrl: './input-display.component.html',
  styleUrls: ['./input-display.component.css'],
})
export class InputDisplayComponent implements OnInit {
  @Input() inputData!: InputData;
  userData!: ApiResponse;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    const payload: ApiRequestPayload = { userId: 1 };
    this.dataService.getUserData(payload).subscribe({
      next: (data) => {
        this.userData = data;
      },
      error: (err) => console.error('Error fetching user data:', err),
    });
  }
}
