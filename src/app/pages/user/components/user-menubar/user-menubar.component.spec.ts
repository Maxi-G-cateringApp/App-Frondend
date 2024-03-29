import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMenubarComponent } from './user-menubar.component';

describe('UserMenubarComponent', () => {
  let component: UserMenubarComponent;
  let fixture: ComponentFixture<UserMenubarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserMenubarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserMenubarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
