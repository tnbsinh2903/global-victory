import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzInputModule } from "ng-zorro-antd/input";
import { SignInComponent } from "./SignIn/SignInComponent";
import { ReactiveFormsModule } from "@angular/forms";
import { SignInService } from "./SignIn/SignInService";
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthInterceptor } from "./interceptors/AuthInterceptor";
import { NzModalService } from "ng-zorro-antd/modal";
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  imports: [
    NzModalModule,
    HttpClientModule,
    NzCheckboxModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    RouterModule.forChild([
      {
        path: "",
        component: SignInComponent,
      },
    ]),
  ],
  declarations: [SignInComponent],
  providers: [SignInService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },],
  exports: [SignInComponent]
})
export class AuthModule { }
