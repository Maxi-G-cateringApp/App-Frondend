import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboItemsComponent } from './combo-items.component';

describe('ComboItemsComponent', () => {
  let component: ComboItemsComponent;
  let fixture: ComponentFixture<ComboItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComboItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComboItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
