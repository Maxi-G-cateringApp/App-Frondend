import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKitchenCrewTeamComponent } from './add-kitchen-crew-team.component';

describe('AddKitchenCrewTeamComponent', () => {
  let component: AddKitchenCrewTeamComponent;
  let fixture: ComponentFixture<AddKitchenCrewTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddKitchenCrewTeamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddKitchenCrewTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
