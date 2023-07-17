import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { signInFailure, signInSuccess, logout } from './AuthAction';
import { User_ResponseLogin } from '@global-victory/erp/api-interfaces';
import { HttpErrorResponse } from '@angular/common/http';


export interface State {
    permissions: Array<string>;
    token: string;
    user: User_ResponseLogin | null;
    loginError?: HttpErrorResponse | null;
}

export const initialState: State = {
    permissions: [],
    token: "",
    user: null,
    loginError: null
};

export const localStorageKey = 'authState';


const loadState = () => {
    try {
        const authState = localStorage.getItem(localStorageKey);
        if (authState === null) {
            return initialState;
        }
        return JSON.parse(authState);
    } catch (error) {
        return initialState;
    }
};

const saveState = (state: State) => {
    try {
        const authState = JSON.stringify(state);
        localStorage.setItem(localStorageKey, authState);
    } catch (error) {
    }
};

export const _authReducer = createReducer(
    loadState(),
    on(signInSuccess, (state, { response }) => {
        const newState = {
            ...state,
            token: response.access_token,
            user: response.user,
            permissions: response.permissions,
            loginError: null,
        };
        saveState(newState);
        return newState;
    }),
    on(signInFailure, (state, { error }) => {
        const newState = {
            ...state,
            token: null,
            user: null,
            permissions: null,
            loginError: error,
        };
        saveState(newState);
        return newState;
    }),
    on(logout, (state) => {
        localStorage.removeItem(localStorageKey);
        const newState = {
            ...state,
            token: null,
            user: null,
            permissions: null,
            loginError: null,
        };
        return newState;
    })
);

export function authReducer(state: State | undefined, action: Action) {
    return _authReducer(state, action);
}

export const selectAuthState = createFeatureSelector<State>('auth');

export const selectToken = createSelector(
    selectAuthState,
    (state) => state.token,
);
export const selectUser = createSelector(
    selectAuthState,
    (state) => state.user
);
export const selectPermissions = createSelector(
    selectAuthState,
    (state) => state.permissions
);

export const selectLoginError = createSelector(
    selectAuthState,
    (state) => state.loginError
);