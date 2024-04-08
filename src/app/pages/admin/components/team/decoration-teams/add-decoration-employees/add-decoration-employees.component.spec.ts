import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDecorationEmployeesComponent } from './add-decoration-employees.component';

describe('AddDecorationEmployeesComponent', () => {
  let component: AddDecorationEmployeesComponent;
  let fixture: ComponentFixture<AddDecorationEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddDecorationEmployeesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDecorationEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
