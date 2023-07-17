import { NgModule } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@NgModule({
    imports: [
        UntypedFormBuilder,
        UntypedFormGroup,
        Validators,

    ],
    declarations: [RoleCreateModule],
})
export class RoleCreateModule { };