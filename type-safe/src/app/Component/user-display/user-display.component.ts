import { Component, OnInit } from '@angular/core';
import { UserData, ApiResponse } from 'src/app/interfaces';
import { UserDataService } from 'src/app/Services/user-data.service';

@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.css']
})

export class UserDisplayComponent implements OnInit {
  users: UserData[] = [];
  errorMessage: string | null = null;

  constructor(private userDataService: UserDataService) {}

  ngOnInit(): void {
    this.userDataService.getUserData().subscribe({
      next: (response: ApiResponse<UserData[]>) => {
        if (response.success) {
          this.users = response.data;
        } else {
          this.errorMessage = response.message;
        }
      },
      error: (err) => {
        this.errorMessage = 'An error occurred while fetching user data.';
      }
    });
  }
}
