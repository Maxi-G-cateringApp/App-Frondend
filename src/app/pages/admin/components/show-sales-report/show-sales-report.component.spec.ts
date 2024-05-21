import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSalesReportComponent } from './show-sales-report.component';

describe('ShowSalesReportComponent', () => {
  let component: ShowSalesReportComponent;
  let fixture: ComponentFixture<ShowSalesReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowSalesReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowSalesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
