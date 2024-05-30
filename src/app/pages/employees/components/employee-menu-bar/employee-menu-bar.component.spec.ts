import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeMenuBarComponent } from './employee-menu-bar.component';

describe('EmployeeMenuBarComponent', () => {
  let component: EmployeeMenuBarComponent;
  let fixture: ComponentFixture<EmployeeMenuBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeMenuBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeMenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
