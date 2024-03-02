import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSessionComponent } from './bottom-session.component';

describe('BottomSessionComponent', () => {
  let component: BottomSessionComponent;
  let fixture: ComponentFixture<BottomSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BottomSessionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BottomSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
