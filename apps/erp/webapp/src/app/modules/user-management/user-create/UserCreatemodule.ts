import { NgModule } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { UserCreateComponent } from "./UserCreateComponent";

@NgModule({
    imports: [
        UntypedFormBuilder,
        UntypedFormGroup,
        Validators,
        RouterModule.forChild([
            {
                path: "",
                component: UserCreateComponent
            }
        ])
    ],
    declarations: [UserCreateComponent],
})
export class UserCreateModule { };