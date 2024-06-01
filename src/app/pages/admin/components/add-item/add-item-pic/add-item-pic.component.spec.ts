import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemPicComponent } from './add-item-pic.component';

describe('AddItemPicComponent', () => {
  let component: AddItemPicComponent;
  let fixture: ComponentFixture<AddItemPicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddItemPicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddItemPicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
