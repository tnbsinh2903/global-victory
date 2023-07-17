import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map } from "rxjs";
import { SignInService } from "../auth/SignIn/SignInService";

@Injectable({ providedIn: 'root' })
export class PermissionGuard implements CanActivate {

    constructor(
        public router: Router,
        private signInService: SignInService,
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const permission = route.data['permission'];
        const nextUrl = route.data['next_url'];

        return this.signInService.authorize(permission, nextUrl).pipe(
            map((result: boolean | UrlTree) => {
                if (result === true) {
                    return true;
                } else {
                    if (result instanceof UrlTree) {
                        return result;
                    } else {
                        return this.router.createUrlTree([nextUrl]);
                    }
                }
            })
        );
    }
}
