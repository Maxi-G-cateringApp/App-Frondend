import { HttpClient, HttpHeaders } from '@angular/common/http';
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
import { ReviewModel } from '../../pages/user/models/rating.model';
import { UpdateUser } from '../../pages/user/models/update-user.model';
import { Employee } from '../../pages/admin/models/employee.model';
import { Partner } from '../../pages/admin/models/partner.model';
import { Offer } from '../../pages/admin/models/offer.model';
import { saveAs } from 'file-saver';
import { Notifications } from '../../pages/admin/models/notification.model';

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
  updateItemPicture(file: File, ItemId: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`/item-picture/${ItemId}`, formData);
  }

  addFoodCombo(combo: FoodCombo, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('combo', JSON.stringify(combo));
    return this.http.post<any>('/add-combo', formData);
  }

  addFoodItem(item: FoodItems, file: File): Observable<VerificationResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('item', JSON.stringify(item));
    return this.http.post<VerificationResponse>('/add-item', formData);
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
    return this.http.put<any>(`/edit-combo?id=${id}`, item);
  }
  editFoodItem(id: number, Item: FoodItems): Observable<any> {
    return this.http.put<any>(`/edit-item?id=${id}`, Item);
  }

  deleteCombo(id: number): Observable<any> {
    return this.http.delete<any>(`/delete-combo?id=${id}`);
  }
  deleteItem(id: number): Observable<any> {
    return this.http.delete<any>(`/delete-item?id=${id}`);
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
    return this.http.get<FoodCombo[]>('/all-combos');
  }
  getAllCombosWithoutOffer(): Observable<FoodCombo[]> {
    return this.http.get<FoodCombo[]>('/combos/no-offer');
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

  getCategoryById(id: number): Observable<Categories> {
    return this.http.get<Categories>(`/get/category?id=${id}`);
  }
  editCategory(id: number, category: Categories): Observable<any> {
    return this.http.put<any>(`/edit/category?id=${id}`, category);
  }
  getAllEvents(): Observable<Events[]> {
    return this.http.get<Events[]>('/events');
  }

  editEvent(id: number, event: Events): Observable<any> {
    return this.http.put<any>(`/edit/event?id=${id}`, event);
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
  getEventById(id: number): Observable<Events> {
    return this.http.get<Events>(`/get/event?id=${id}`);
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
  createBalancePaymentTransaction(orderId: string): Observable<any> {
    return this.http.post<any>(`/payment/balance/${orderId}`, null).pipe(
      catchError((error) => {
        console.error('Error occurred while fetching orders:', error);
        throw error;
      })
    );
  }
  paymentConfirm(orderId: string): Observable<any> {
    return this.http.post<any>(`/payment/confirm/${orderId}`, null);
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
  deleteServingTeam(id: number): Observable<any> {
    return this.http.delete<any>(`/delete-serve_team?id=${id}`);
  }

  getServTeamMembersByTeamId(id: number): Observable<any[]> {
    return this.http.get<any[]>(`/get/team-members?id=${id}`);
  }

  inactiveMemberFromTeam(empId: number): Observable<any> {
    return this.http.put<any>(`/inactive/member/${empId}`, null);
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

  deleteDecorationTeam(id: number): Observable<any> {
    return this.http.delete<any>(`/delete-dec_team?id=${id}`);
  }
  getDecorationMembersByTeamId(id: number): Observable<DecorImpl[]> {
    return this.http.get<DecorImpl[]>(`/get/dec-emp?id=${id}`);
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
  deleteKitchenCrewTeam(id: number): Observable<any> {
    return this.http.delete<any>(`/delete-kitchen_crew?id=${id}`);
  }

  getKitchenMembersByTeamId(id: number): Observable<any[]> {
    return this.http.get<any[]>(`/get/kitchen-team-members?id=${id}`);
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

  googleLogin(token: string): Observable<any> {
    return this.http.post<any>(`/google/login?token=${token}`, null);
  }

  giveReview(review: ReviewModel): Observable<any> {
    return this.http.post<any>('/add-review', review);
  }

  orderComplete(orderId: string): Observable<any> {
    return this.http.post<any>(`/complete-order?orderId=${orderId}`, null);
  }

  updateUser(userId: string, user: UpdateUser): Observable<any> {
    console.log(userId, 'user id  in service');

    return this.http.put<any>(`/update-user/${userId}`, user);
  }

  getUserByRole(): Observable<User> {
    return this.http.get<User>('/get-admin');
  }

  getRecipientId(adminId: string) {
    return this.http.post<any>(`/get-chats?user=${adminId}`, null);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('/all-users');
  }
  getAllPartnerUsers(): Observable<User[]> {
    return this.http.get<User[]>('/partner-users');
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>('/add-employee', employee);
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('/all-employees');
  }
  inactivateEmp(id: number): Observable<any> {
    return this.http.put<any>(`/inactive/emp?id=${id}`, null);
  }
  activateEmp(id: number): Observable<any> {
    return this.http.put<any>(`/active/emp?id=${id}`, null);
  }

  getEmployeesWithoutTeam(): Observable<Employee[]> {
    return this.http.get<Employee[]>('/employees/without-team');
  }

  addFeed(formData: FormData): Observable<any> {
    return this.http.post<any>('/add-feed', formData);
  }

  getAllFeeds(): Observable<any[]> {
    return this.http.get<any[]>('/get-feeds');
  }

  getUserFeeds(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`/get-feeds/user?userId=${userId}`);
  }

  deleteFeed(id: number): Observable<any> {
    return this.http.delete<any>(`/delete-feed?id=${id}`);
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`/get-user?userId=${userId}`);
  }

  addPartner(userId: string): Observable<any> {
    return this.http.post<any>(`/set-partner?userId=${userId}`, null);
  }
  createPartner(partnerData: Partner): Observable<any> {
    return this.http.post<any>('/create/partner', partnerData);
  }

  deleteEmp(id: number): Observable<any> {
    return this.http.delete<any>(`/delete/emp?id=${id}`);
  }

  // offer
  createOffer(offer: Offer): Observable<any> {
    return this.http.post<any>('/create-offer', offer);
  }
  getAllOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>('/get-offers');
  }
  enableOffer(id: number): Observable<any> {
    return this.http.post<any>(`/enable-offer?id=${id}`, null);
  }
  disableeOffer(id: number): Observable<any> {
    return this.http.post<any>(`/disable-offer?id=${id}`, null);
  }
  getOfferById(id: number): Observable<Offer> {
    return this.http.get<Offer>(`/get/offer?id=${id}`);
  }
  editOffer(id: number, offerData: Offer): Observable<any> {
    return this.http.put<any>(`/edit/offer?id=${id}`, offerData);
  }

  getAllEnabledOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>('/get/enabled/offers');
  }

  //sales

  getOneMonthSales() {
    return this.http.get('/admin/sales/one-month');
  }

  showGraph(timePeriod: string) {
    return this.http.get(`/admin/show/graph?timePeriod=${timePeriod}`);
  }
  showAllTimeGraph() {
    return this.http.get('/admin/show/total-sale/graph');
  }
  getSalesReport(timePeriod: string) {
    return this.http.get(`/admin/sales-report/timePeriod?timePeriod=${timePeriod}`);
  }
  getSalesReportByDates(dates: any): Observable<any> {
    return this.http.post<any>('/admin/sales-report/date', dates);
  }
  downloadPDF(timePeriod: string) {
    const params = { timePeriod };
    const headers = new HttpHeaders({ Accept: 'application/pdf' });
    return this.http
      .get('/admin/sales-report/download', { headers, params, responseType: 'blob' })
      .pipe(
        map((response: Blob) => {
          const fileName = 'sales-report.pdf';
          saveAs(response, fileName);
        })
      );
  }
  downloadPDFBydates(dates: any) {
    const headers = new HttpHeaders({ Accept: 'application/pdf' });
    return this.http
      .post('/admin/sales-report/dates/download', dates, {
        headers,
        responseType: 'blob',
      })
      .pipe(
        map((response: Blob) => {
          const fileName = 'sales-report.pdf';
          saveAs(response, fileName);
        })
      );
  }

  //notifications
  getAllNotifications(): Observable<Notifications[]> {
    return this.http.get<Notifications[]>('/get/notifications');
  }

  deleteNotification(id: number) {
    return this.http.delete(`/delete/notification?id=${id}`);
  }

  viewNotification(id: number): Observable<any> {
    return this.http.post(`/view/notification?id=${id}`, null);
  }

  getEmployeeByEmail(email: string) {
    return this.http.get(`/get-emp/email?email=${email}`);
  }

  getEmployeesTeam(id: number) {
    return this.http.get(`/get/team/order?id=${id}`);
  }
}
