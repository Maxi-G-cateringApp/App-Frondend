import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenCrewMembersComponent } from './kitchen-crew-members.component';

describe('KitchenCrewMembersComponent', () => {
  let component: KitchenCrewMembersComponent;
  let fixture: ComponentFixture<KitchenCrewMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KitchenCrewMembersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KitchenCrewMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
