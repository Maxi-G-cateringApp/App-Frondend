import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServingTeamComponent } from './add-serving-team.component';

describe('AddServingTeamComponent', () => {
  let component: AddServingTeamComponent;
  let fixture: ComponentFixture<AddServingTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddServingTeamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddServingTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
