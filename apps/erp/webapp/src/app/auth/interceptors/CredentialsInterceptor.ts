import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class WithCredentialsInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const modifiedReq = req.clone({ withCredentials: true });
        return next.handle(modifiedReq);
    }
}
