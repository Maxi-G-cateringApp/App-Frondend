import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComboPicComponent } from './add-combo-pic.component';

describe('AddComboPicComponent', () => {
  let component: AddComboPicComponent;
  let fixture: ComponentFixture<AddComboPicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddComboPicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddComboPicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
