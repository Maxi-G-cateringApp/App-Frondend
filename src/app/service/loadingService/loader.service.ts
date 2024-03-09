import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoaderService {

    private loading = new BehaviorSubject<boolean>(false);
    loadingAction$ = this.loading.asObservable();



    constructor(){}

    setLoading(loading: boolean) {
        this.loading.next(loading);
      }

}