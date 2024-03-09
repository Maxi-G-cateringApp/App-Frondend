import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FoodCombo } from '../../model/itemModels/combo.model';
import { Observable } from 'rxjs';
import { VerificationResponse } from '../../model/verificationResponse.model';

@Injectable({
  providedIn: 'root'
})

export class FoodItemServicesService {

  constructor(private http: HttpClient) { }


  addFoodCombo(combo: FoodCombo):Observable<VerificationResponse>{
    return this.http.post<VerificationResponse>('/admin/add-combo',combo);
  }

  getAllCombos():Observable<FoodCombo[]>{
   return this.http.get<FoodCombo[]>('/admin/all-combos');
  }


}
