import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Route, Router, UrlTree } from "@angular/router";
import { Auth_Response, Auth_SignInDTO } from "@global-victory/erp/api-interfaces";
import { Observable, Subject, catchError, map, of } from "rxjs";
import { localStorageKey } from "../../state/auth/AuthReduce";
import { RoleService } from './../../modules/roles-management/role-service/RoleService';

@Injectable({
    providedIn: 'root'
})
export class SignInService {

    constructor(
        private http: HttpClient,
        private roleService: RoleService,
        private router: Router,
    ) { }

    baseUrl = 'http://localhost:3333/api/auth/sign-in';
    refreshUrl = 'http://localhost:3333/api/auth/refresh';
    logouthUrl = 'http://localhost:3333/api/auth/sign-out';
    removeCookieUrl = 'http://localhost:3333/api/auth/remove-cookie';

    // userCurrent!: User_ResponseLogin;

    signIn(payload: Auth_SignInDTO): Observable<Auth_Response> {
        return this.http.post<Auth_Response>(this.baseUrl, payload).pipe()
    }

    refresh(): Observable<Object> {
        return this.http.post<Object>(this.refreshUrl, {},);
    }

    removeCookie(): Observable<void> {
        return this.http.post<void>(this.removeCookieUrl, {}, { withCredentials: true }).pipe()
    }

    logout(): Observable<void> {
        return this.http.post<void>(this.logouthUrl, {}, { withCredentials: true }).pipe()
    }

    authorize(permission: string, nextUrl: string): Observable<boolean | UrlTree> {
        const { user } = JSON.parse(localStorage.getItem('authState') || '{}');
        return this.roleService.getPermissionOfUserByEmail(user.email).pipe(
            map((permissions: Array<string>) => {
                if (permissions.includes(permission)) {
                    return true;
                } else {
                    const urlTree = this.router.createUrlTree([nextUrl]);
                    return urlTree;
                }
            }),
            catchError(() => {
                const urlTree = this.router.createUrlTree([nextUrl]);
                return of(urlTree);
            })
        );
    }

    isLogin(): boolean {
        const user = JSON.parse(localStorage.getItem(localStorageKey) || '{}');
        return user;
    }
}   
