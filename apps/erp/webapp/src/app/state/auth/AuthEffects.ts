import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, exhaustMap, map, tap, withLatestFrom } from 'rxjs';
import * as AuthActions from './AuthAction';
import { SignInService } from '../../auth/SignIn/SignInService';
import { Store } from '@ngrx/store';
import { State, selectLoginError } from './AuthReduce';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authService: SignInService,
        private router: Router,
        private store: Store<State>,
        private notification: NzNotificationService,

    ) { }

    createNotification(type: string, title: string, message: string): void {
        if (this.notification) {
            this.notification.remove();
        }
        this.notification.create(
            type,
            title,
            message,
            { nzDuration: 3000 }
        );
    }


    loginRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.signIn),
            exhaustMap((action) =>
                this.authService
                    .signIn(action.payload)
                    .pipe(
                        map((response) =>
                            AuthActions.signInSuccess({ response })
                        ),
                        catchError((error) => of(AuthActions.signInFailure({ error })))
                    )
            )
        )
    );

    loginSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.signInSuccess),
                withLatestFrom(this.store.select((state) => state.user)),
                tap(({ }) => {
                    this.router.navigateByUrl('news-management');
                    this.createNotification("success", "Success", "Login Successfully")
                })
            ),
        { dispatch: false }
    );

    loginFail$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.signInFailure),
                withLatestFrom(this.store.select(selectLoginError)),
                tap(([action, loginError]) => {
                    if (loginError?.error) {
                        this.createNotification(loginError.error.status, loginError.error.title, loginError.error.message,);
                    }
                })
            ),
        { dispatch: false }
    );


}