import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenCrewTeamsComponent } from './kitchen-crew-teams.component';

describe('KitchenCrewTeamsComponent', () => {
  let component: KitchenCrewTeamsComponent;
  let fixture: ComponentFixture<KitchenCrewTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KitchenCrewTeamsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KitchenCrewTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
