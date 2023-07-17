import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const httpCode = context.switchToHttp().getResponse().statusCode;

        return next
            .handle()
            .pipe(
                tap(() => {
                }),
            );
    }
}