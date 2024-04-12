import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../pages/auth/models/user.model';
import { Observable, catchError, map, throwError } from 'rxjs';
import { LoginData } from '../../pages/auth/models/loginReq.model';
import { AuthResponse } from '../../pages/auth/models/authResponse.model';
import { VerificationResponse } from '../../pages/auth/models/verificationResponse.model';
import { FoodCombo } from '../../pages/admin/models/combo.model';
import { FoodItems } from '../../pages/admin/models/foodItems.model';
import { Categories } from '../../pages/admin/models/category.model';
import { Events } from '../../pages/admin/models/event.model';
import { OrderDetails } from '../../pages/user/models/order.model';
import { LocationDetails } from '../../pages/user/models/locationDetails.model';
import { OrderSuccess } from '../../pages/user/models/order-success.model';
import { ServingEmpl } from '../../pages/admin/components/team/teamModels/servingEmpl.model';
import { DecorImpl } from '../../pages/admin/components/team/teamModels/decorEmpl.model';
import { KitchenCrewEmpl } from '../../pages/admin/components/team/teamModels/kitchenCrew.model';
import { OrderProcessing } from '../../pages/admin/models/orderProcessing.model';
import { Token } from '@angular/compiler';
import { GToken } from '../../pages/auth/models/token.model';
import { ReviewModel } from '../../pages/user/models/rating.model';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(private http: HttpClient) {}

  register(userRegistration: User): Observable<User> {
    return this.http.post<User>('/register', userRegistration);
  }

  login(email: LoginData, password: LoginData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/login', { email, password });
  }

  verifyAccount(otp: string, email: string): Observable<VerificationResponse> {
    return this.http.post<VerificationResponse>('/verify-account', {
      email,
      otp,
    });
  }
  changeProfilePicture(file: File, userId: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`/profile-picture/${userId}`, formData);
  }

  updateComboPicture(file: File, comboId: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`/combo-picture/${comboId}`, formData);
  }

  addFoodCombo(combo: FoodCombo, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('combo', JSON.stringify(combo));
    return this.http.post<any>('/admin/add-combo', formData);
  }

  addFoodItem(item: FoodItems): Observable<VerificationResponse> {
    return this.http.post<VerificationResponse>('/admin/add-item', item);
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

  editFoodCombo(id: number, item: FoodCombo): Observable<any> {
    return this.http.put<any>(`/admin/edit-combo?id=${id}`, item);
  }
  editFoodItem(id: number, Item: FoodItems): Observable<any> {
    return this.http.put<any>(`/admin/edit-item?id=${id}`, Item);
  }

  deleteCombo(id: number): Observable<any> {
    return this.http.delete<any>(`/admin/delete-combo?id=${id}`);
  }
  deleteItem(id: number): Observable<any> {
    return this.http.delete<any>(`/admin/delete-item?id=${id}`);
  }
  deletCategories(id: number): Observable<Categories> {
    return this.http.delete<Categories>(`/delete-category?id=${id}`);
  }
  deletEvent(id: number): Observable<any> {
    return this.http.delete<any>(`/delete-event?id=${id}`);
  }

  getAllFoodItems(): Observable<FoodItems[]> {
    return this.http.get<FoodItems[]>('/items');
  }

  getAllCombos(): Observable<FoodCombo[]> {
    return this.http.get<FoodCombo[]>('/admin/all-combos');
  }

  getAllCombosByCategory(id: number): Observable<FoodCombo[]> {
    return this.http.get<FoodCombo[]>(`/combos-category?id=${id}`);
  }

  getAllItemByCategory(id: number): Observable<FoodItems[]> {
    return this.http.get<FoodItems[]>(`/items-category?id=${id}`);
  }

  getAllcategories(): Observable<any> {
    return this.http.get('/all-categories');
  }
  getAllEvents(): Observable<Events[]> {
    return this.http.get<Events[]>('/events');
  }

  getUserImage(userId: string): Observable<Blob> {
    return this.http
      .get(`/get-file/${userId}`, { responseType: 'blob' })
      .pipe();
  }

  getComboImage(id: number): Observable<Blob> {
    return this.http
      .get(`/get-comboimage/${id}`, { responseType: 'blob' })
      .pipe();
  }

  addCategories(categories: Categories): Observable<any> {
    return this.http.post<any>('/add-category', categories);
  }

  addEvent(event: Events): Observable<any> {
    return this.http.post<any>('/add-event', event);
  }

  saveOrder(orderData: OrderDetails): Observable<any> {
    return this.http.post<any>('/save-order', orderData);
  }

  getTotalAmount(orderId: string): Observable<any> {
    return this.http.get<any>(`/get/order/amount/${orderId}`);
  }

  addLocation(data: LocationDetails): Observable<any> {
    return this.http.post<any>('/add/location', data);
  }

  getAllOrders(): Observable<any> {
    return this.http.get<any>('/get-orders');
  }

  getOrderById(orderId: string): Observable<any> {
    return this.http.get<any>(`/get-order/${orderId}`).pipe(
      catchError((error) => {
        console.error('Error occurred while fetching orders:', error);
        return error;
      })
    );
  }

  acceptOrder(orderId: string): Observable<any> {
    return this.http.post<any>(`/accept-order?orderId=${orderId}`, null);
  }

  getOrderByUser(userId: string): Observable<any> {
    return this.http.get<any>(`/get-order/userId/${userId}`);
  }

  createTransaction(orderId: string): Observable<any> {
    return this.http.post<any>(`/payment/${orderId}`, null).pipe(
      catchError((error) => {
        console.error('Error occurred while fetching orders:', error);
        throw error;
      })
    );
  }

  orderSuccess(data: OrderSuccess): Observable<any> {
    return this.http.post<any>('/order-success', data);
  }

  // Serving Team
  addServingTeam(teamName: string): Observable<any> {
    return this.http.post<any>('/add/serv_team', teamName);
  }

  getAllServingTeams(): Observable<any> {
    return this.http.get<any>('/serving_teams');
  }

  addServingEmpl(data: ServingEmpl): Observable<any> {
    return this.http.post<any>('/add/serve_impl', data);
  }

  getAllServingEmployees(): Observable<any> {
    return this.http.get<any>('/serving_emp');
  }

  // Decoration Team

  getAllDecorationTeams(): Observable<any> {
    return this.http.get<any>('/decor_teams');
  }
  getAllDecorationEmployees(): Observable<any> {
    return this.http.get<any>('/decor_emp');
  }

  addDecorationEmpl(data: DecorImpl): Observable<any> {
    return this.http.post<any>('/add/decor_emp', data);
  }

  addDecorationTeam(teamName: string): Observable<any> {
    return this.http.post<any>('/add/decor_team', teamName);
  }

  // kitchenCrew Team

  getAllKitchenCrewTeams(): Observable<any> {
    return this.http.get<any>('/kitchenCrew_teams');
  }
  getAlllKitchenCrewEmployees(): Observable<any> {
    return this.http.get<any>('/kitchenCrew_emp');
  }

  addlKitchenCrewEmpl(data: KitchenCrewEmpl): Observable<any> {
    return this.http.post<any>('/add/kitchenCrew_impl', data);
  }

  addlKitchenCrewTeam(teamName: string): Observable<any> {
    return this.http.post<any>('/add/kitchenCrew_team', teamName);
  }

  cancelOrder(orderId: string): Observable<any> {
    return this.http.post<any>(`/cancel-order/${orderId}`, null);
  }

  orderProcessing(data: OrderProcessing): Observable<any> {
    return this.http.post<any>('/process_order', data);
  }

  getUrl(): Observable<any> {
    return this.http.get('/auth/url');
  }

  googleLogin(token: string):Observable<any>{
    return this.http.post<any>(`/google/login?token=${token}`,null)
  }

  giveReview(review: ReviewModel): Observable<any>{
    return this.http.post<any>('/add-review',review)

  }


}
