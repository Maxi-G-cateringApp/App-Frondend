import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKitchenCrewEmployeesComponent } from './add-kitchen-crew-employees.component';

describe('AddKitchenCrewEmployeesComponent', () => {
  let component: AddKitchenCrewEmployeesComponent;
  let fixture: ComponentFixture<AddKitchenCrewEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddKitchenCrewEmployeesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddKitchenCrewEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
