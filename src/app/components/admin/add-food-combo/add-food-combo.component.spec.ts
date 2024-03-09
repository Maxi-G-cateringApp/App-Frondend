import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFoodComboComponent } from './add-food-combo.component';

describe('AddFoodComboComponent', () => {
  let component: AddFoodComboComponent;
  let fixture: ComponentFixture<AddFoodComboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddFoodComboComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddFoodComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
