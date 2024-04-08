import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServingTeamsComponent } from './serving-teams.component';

describe('ServingTeamsComponent', () => {
  let component: ServingTeamsComponent;
  let fixture: ComponentFixture<ServingTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServingTeamsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServingTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
