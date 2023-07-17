
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
    HttpClient
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { SignInService } from '../SignIn/SignInService';
import { localStorageKey } from '../../state/auth/AuthReduce';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    refreshTokenInProgress = false;

    constructor(
        private modal: NzModalService,
        private router: Router,
        private signInService: SignInService
    ) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const tokenValue = JSON.parse(localStorage.getItem(localStorageKey) || '{}')['token'];
        if (tokenValue) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${tokenValue}`
                }
            });
        }

        return next.handle(request).pipe(
            catchError((err: HttpErrorResponse) => {
                if (localStorage.getItem(localStorageKey) === null) {
                    this.signInService.removeCookie().subscribe(() => {
                        this.router.navigateByUrl('sign-in');
                        return;
                    });
                }

                if (err.status === 401 && !this.refreshTokenInProgress) {
                    this.refreshTokenInProgress = true;
                    return this.signInService.refresh().pipe(
                        switchMap((res: any) => {
                            const obj = JSON.parse(localStorage.getItem(localStorageKey) || '{}');
                            obj.token = res['access_token'];
                            localStorage.setItem(localStorageKey, JSON.stringify(obj));
                            this.refreshTokenInProgress = false;
                            return next.handle(
                                request.clone({
                                    setHeaders: {
                                        Authorization: `Bearer ${res['access_token']}`
                                    }
                                })
                            );
                        }),
                        catchError((err: HttpErrorResponse) => {
                            if (err.status === 401) {
                                this.refreshTokenInProgress = true;
                                this.signInService.removeCookie().subscribe(() => {
                                    localStorage.removeItem(localStorageKey);
                                    this.router.navigateByUrl('sign-in');
                                });
                            }
                            this.refreshTokenInProgress = false;
                            return throwError('Unauthorized');
                        })
                    );
                }

                if (err.status === 403) {
                    this.refreshTokenInProgress = true;
                    this.modal.confirm({
                        nzCloseIcon: '',
                        nzTitle: 'Notification',
                        nzContent: 'You have been blocked. Please log in again.',
                        nzOkText: 'Log In',
                        nzCancelText: null,
                        nzOnOk: () =>
                            this.signInService.logout().subscribe(() => {
                                localStorage.removeItem(localStorageKey);
                                this.router.navigateByUrl('sign-in');
                            })
                    });
                }
                return throwError(() => err);
            })
        );
    }
}
