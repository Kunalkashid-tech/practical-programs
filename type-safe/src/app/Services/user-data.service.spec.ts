import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserDataService } from './user-data.service';
import { UserData, ApiResponse } from '../interfaces';

describe('UserDataService', () => {
  let service: UserDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserDataService]
    });
    service = TestBed.inject(UserDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch user data', () => {
    const dummyUsers: UserData[] = [
      { name: 'John Doe', age: 30, email: 'john.doe@example.com' },
      { name: 'Jane Doe', age: 25, email: 'jane.doe@example.com' }
    ];

    service.getUserData().subscribe((response: ApiResponse<UserData[]>) => {
      expect(response.data.length).toBe(2);
      expect(response.data).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush({ data: dummyUsers, success: true, message: 'Success' });
  });
});
