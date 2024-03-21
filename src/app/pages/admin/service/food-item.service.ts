import { Injectable } from '@angular/core';
import { MasterService } from '../../../core/services/master.service';

@Injectable({
  providedIn: 'root'
})
export class FoodItemService {

  constructor(private masterService: MasterService) { }



  
}
