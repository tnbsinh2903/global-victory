import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        public router: Router,
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (localStorage.getItem('authState') === null) {
            this.router.navigate(['/sign-in'], { queryParams: { retUrl: route.url } });
            return false;
        }
        else return true;
    }
}