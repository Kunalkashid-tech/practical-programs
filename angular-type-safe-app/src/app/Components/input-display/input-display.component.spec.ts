import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputDisplayComponent } from './input-display.component';
import { DataService } from 'src/app/Services/data.service';
import { of } from 'rxjs';

describe('InputDisplayComponent', () => {
  let component: InputDisplayComponent;
  let fixture: ComponentFixture<InputDisplayComponent>;
  let dataService: jasmine.SpyObj<DataService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('DataService', ['getUserData']);

    TestBed.configureTestingModule({
      declarations: [InputDisplayComponent],
      providers: [{ provide: DataService, useValue: spy }],
    });

    fixture = TestBed.createComponent(InputDisplayComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
  });

  it('should display input data', () => {
    const inputData = { name: 'John Doe', age: 30 };
    component.inputData = inputData;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('Name: John Doe');
  });

  it('should fetch and display API data', () => {
    const apiResponse = { name: 'Jane Doe', age: 25 };
    dataService.getUserData.and.returnValue(of(apiResponse));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.userData.name).toBe('Jane Doe');
    expect(component.userData.age).toBe(25);
  });
});
