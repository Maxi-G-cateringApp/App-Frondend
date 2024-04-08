import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServingEmployeesComponent } from './add-serving-employees.component';

describe('AddServingEmployeesComponent', () => {
  let component: AddServingEmployeesComponent;
  let fixture: ComponentFixture<AddServingEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddServingEmployeesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddServingEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
