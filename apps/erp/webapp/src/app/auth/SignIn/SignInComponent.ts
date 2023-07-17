import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { SignInService } from "./SignInService";
import { Auth_SignInDTO } from "@global-victory/erp/api-interfaces";
import { Store } from "@ngrx/store";
import * as AuthActions from '../../state/auth/AuthAction'
import { State, selectToken, selectUser } from "../../state/auth/AuthReduce";
import { AuthInterceptor } from "../interceptors/AuthInterceptor";

@Component({
  selector: "global-victory-sign-in",
  templateUrl: "./SignInComponent.html",
  styleUrls: ['./SignInComponent.css']
})
export class SignInComponent implements OnInit {

  constructor(
    private signInService: SignInService,
    private fb: UntypedFormBuilder,
    private store: Store,
  ) { }

  validateForm !: UntypedFormGroup;
  checked = false;

  ngOnInit(): void {
    this.load();
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.pattern('')]],
      password: [null, [Validators.required, Validators.pattern('')]],
    })

  }

  load() {
    this.store.select(selectUser).subscribe((users) => {
    });
    this.store.select(selectToken).subscribe((token) => {
    })
  }

  submitForm() {
    if (this.validateForm.valid) {
      const data = this.validateForm.value;
      const payload: Auth_SignInDTO = {
        email: data.email,
        password: data.password
      }
      this.store.dispatch(AuthActions.signIn({ payload }));
      this.load();
    }
  }
  rememberMe(event: any): void {
    this.checked = !this.checked
  }
}
