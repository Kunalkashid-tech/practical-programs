import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDisplayComponent } from './user-display.component';
import { UserDataService } from 'src/app/Services/user-data.service';
import { of } from 'rxjs';
import { UserData, ApiResponse } from 'src/app/interfaces';

describe('UserDisplayComponent', () => {
  let component: UserDisplayComponent;
  let fixture: ComponentFixture<UserDisplayComponent>;
  let mockUserDataService: jasmine.SpyObj<UserDataService>;

  beforeEach(async () => {
    const userDataServiceSpy = jasmine.createSpyObj('UserDataService', ['getUserData']);

    await TestBed.configureTestingModule({
      declarations: [UserDisplayComponent],
      providers: [{ provide: UserDataService, useValue: userDataServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDisplayComponent);
    component = fixture.componentInstance;
    mockUserDataService = TestBed.inject(UserDataService) as jasmine.SpyObj<UserDataService>;
  });

  it('should display user data', () => {
    const dummyUsers: UserData[] = [
      { name: 'John Doe', age: 30, email: 'john.doe@example.com' }
    ];
    const response: ApiResponse<UserData[]> = { data: dummyUsers, success: true, message: 'Success' };
    mockUserDataService.getUserData.and.returnValue(of(response));

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('ul').textContent).toContain('John Doe');
  });
});
