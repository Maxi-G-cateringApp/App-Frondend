import { TestBed } from '@angular/core/testing';

import { FoodItemServicesService } from './food-item-services.service';

describe('FoodItemServicesService', () => {
  let service: FoodItemServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodItemServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
