import { bootstrapApplication } from "@angular/platform-browser";
import {
  RouterModule,
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from "@angular/router";
import { AppComponent } from "./app/app.component";
import { appRoutes } from "./app/app.routes";
import { provideAnimations } from "@angular/platform-browser/animations";
import { NZ_I18N, en_US} from "ng-zorro-antd/i18n";
import { registerLocaleData } from "@angular/common";
import vi from "@angular/common/locales/vi";
import { NzConfig, NZ_CONFIG } from "ng-zorro-antd/core/config";
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { importProvidersFrom } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./app/state/auth/AuthEffects";
import { authReducer } from "./app/state/auth/AuthReduce";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { WithCredentialsInterceptor } from "./app/auth/interceptors/CredentialsInterceptor";
import { AuthInterceptor } from "./app/auth/interceptors/AuthInterceptor";
import { NzModalModule } from 'ng-zorro-antd/modal';
// import { AuthGuardCanActivate } from "./app/auth/interceptors/RouteCanactivate";

const ngZorroConfig: NzConfig = {
  theme: {
    primaryColor: '#34A8CA',
  }
};

registerLocaleData(vi);

bootstrapApplication(AppComponent, {

  providers: [
    // importProvidersFrom(RouterModule.forRoot([{ canActivate: [AuthGuardCanActivate] }])),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(NzModalModule),
    importProvidersFrom(StoreModule.forRoot({ auth: authReducer })),
    importProvidersFrom(EffectsModule.forRoot([AuthEffects, NzNotificationService])),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideAnimations(),
    provideHttpClient(),
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_CONFIG, useValue: ngZorroConfig },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WithCredentialsInterceptor,
      multi: true
    },


  ],
}).catch((err) => console.error(err));
