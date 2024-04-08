import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../pages/auth/service/auth-service.service";


export const AuthGuard:CanActivateFn = ()=> {
    const router = inject(Router)
    if(localStorage.getItem('user')){
        return true;
    }
    router.navigate(['/auth'])
    return false;
}

export const LoginGuard: CanActivateFn = ()=> {
    if(localStorage.getItem('user')){
        return false;
    }
    return true;

}

export const RoleGuard: CanActivateFn = ()=> {
    const authService = inject(AuthService);
    const role = authService.getRoleInLocalStorage();
    if(role === 'ADMIN'){
        return true;
    }
    return false;
}



