import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecorationTeamsComponent } from './decoration-teams.component';

describe('DecorationTeamsComponent', () => {
  let component: DecorationTeamsComponent;
  let fixture: ComponentFixture<DecorationTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DecorationTeamsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DecorationTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
