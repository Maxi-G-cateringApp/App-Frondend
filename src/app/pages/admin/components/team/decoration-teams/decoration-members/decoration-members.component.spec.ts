import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecorationMembersComponent } from './decoration-members.component';

describe('DecorationMembersComponent', () => {
  let component: DecorationMembersComponent;
  let fixture: ComponentFixture<DecorationMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DecorationMembersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DecorationMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
