import { createAction, props } from '@ngrx/store';
import { Auth_SignInDTO, Auth_Response } from '@global-victory/erp/api-interfaces';

export const signIn = createAction(
    '[SignIn] Sign In',
    props<{ payload: Auth_SignInDTO }>()

);

export const signInSuccess = createAction(
    '[SignIn API] Sign In Success',
    props<{ response: Auth_Response }>()
);

export const signInFailure = createAction(
    '[SignIn API] Sign In Failure',
    props<{ error: any }>()
);


export const logout = createAction('[Auth] Logout');

