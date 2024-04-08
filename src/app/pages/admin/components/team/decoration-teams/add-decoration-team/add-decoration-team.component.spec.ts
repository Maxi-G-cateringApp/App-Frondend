import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDecorationTeamComponent } from './add-decoration-team.component';

describe('AddDecorationTeamComponent', () => {
  let component: AddDecorationTeamComponent;
  let fixture: ComponentFixture<AddDecorationTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddDecorationTeamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDecorationTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
