import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../pages/auth/models/user.model';
import {  Observable, catchError, throwError } from 'rxjs';
import { LoginData } from '../../pages/auth/models/loginReq.model';
import { AuthResponse } from '../../pages/auth/models/authResponse.model';
import { VerificationResponse } from '../../pages/auth/models/verificationResponse.model';
import { FoodCombo } from '../../pages/admin/models/combo.model';
import { FoodItems } from '../../pages/admin/models/foodItems.model';

@Injectable({
  providedIn: 'root'
})
export class MasterService {


  constructor(private http: HttpClient) { }

  register(userRegistration:User): Observable<User>{
    return this.http.post<User>('/register',userRegistration)
  }

  login(username: LoginData,password: LoginData):Observable<AuthResponse>{
    return this.http.post<AuthResponse>('/login',{username,password})
  }


  verifyAccount(otp: string,email: string):Observable<VerificationResponse>{
    return this.http.post<VerificationResponse>('/verify-account',{email,otp})
  }

  addFoodCombo(combo: FoodCombo): Observable<VerificationResponse> {
    return this.http.post<VerificationResponse>('/admin/add-combo',combo);
  }

  addFoodItem(item: FoodItems): Observable<VerificationResponse> {
    return this.http.post<VerificationResponse>('/admin/add-item',item);
  }

  


  getComboItem(id: number): Observable<FoodCombo> {
    return this.http.get<FoodCombo>(`/get-combo?id=${id}`).pipe(
      catchError((error) => {
        console.error('Error occurred while fetching combo item:', error);
        return throwError(error);
      })
    );
  }

  getItem(id: number): Observable<FoodItems> {
    return this.http.get<FoodItems>(`/get-item?id=${id}`).pipe(
      catchError((error) => {
        console.error('Error occurred while fetching combo item:', error);
        return throwError(error);
      })
    );
  }

  editFoodCombo(id: number,item: FoodCombo):Observable<any>{
    return this.http.put<any>(`/admin/edit-combo?id=${id}`,item);
  }
  editFoodItem(id: number, Item: FoodItems): Observable<any>{
    return this.http.put<any>(`/admin/edit-item?id=${id}`,Item)
  }

  deleteCombo(id: number):Observable<any>{
    return this.http.delete<any>(`/admin/delete-combo?id=${id}`)
  }
  deleteItem(id: number):Observable<any>{
    return this.http.delete<any>(`/admin/delete-item?id=${id}`)
  }

  getAllFoodItems():Observable<FoodItems[]>{
    return this.http.get<FoodItems[]>('/items');
   }

   getAllCombos():Observable<FoodCombo[]>{
    return this.http.get<FoodCombo[]>('/all-combos');
   }

 
  getUserImage(userId: string): Observable<Blob> {
    return this.http.get(`/get-file/${userId}`, { responseType: 'blob' }).pipe(
    );
  }

  changeProfilePicture(file: File,userId: string):Observable<any>{
    const formData = new FormData();
    formData.append('file', file);  
    return this.http.post<any>(`/profile-picture/${userId}`,formData)
   }
}


