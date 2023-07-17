import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Role_CreateDTO } from "@global-victory/erp/api-interfaces";
import { RoleService } from "../role-service/RoleService";
import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification';
import { HttpErrorResponse } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { selectUser } from "../../../state/auth/AuthReduce";


@Component({
    selector: 'global-victory-create-role',
    templateUrl: './CreateRolesComponent.html',
    styles: [
        `[nz-button] {
            margin-bottom  :10px
        }
        [btnCreate]{
            margin-left : 115px
        }
        `]
})
export class CreateRolesComponent implements OnInit {

    constructor(
        private roleService: RoleService,
        private fb: UntypedFormBuilder,
        private readonly notification: NzNotificationService,
        private store: Store
    ) { }

    @Output() realoadData = new EventEmitter<any>
    validateForm!: UntypedFormGroup;
    visible = false;
    creatd_by: string | undefined;


    createNotification(type: string, title: string, message: string, position: NzNotificationPlacement): void {
        if (this.notification) {
            this.notification.remove();
        }
        this.notification.create(
            type,
            title,
            message,
            { nzPlacement: position, nzDuration: 1000 },
        );
    }

    createRole(): void {
        this.store.select(selectUser).subscribe((user) => {
            this.creatd_by = user?.display_name
        })
        if (this.validateForm.valid) {
            const data = this.validateForm.value;
            const createRole: Role_CreateDTO = {
                id: data.idRole!,
                name: data.nameRole,
                created_by: this.creatd_by
            }
            this.roleService.createRole(createRole).subscribe(res => {
                this.createNotification(res.status, res.title, res.message, 'topRight');
                this.realoadData.emit();
                this.close();
                this.validateForm.reset();
            }, (error: HttpErrorResponse) => {
                this.createNotification(error.error.status, error.error.title, error.error.message, "top")

            })
        }
        else {
            Object.values(this.validateForm.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
        }
    }

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            idRole: [null, [Validators.required, Validators.pattern(/^[A-Z]+$/)]],
            nameRole: [null, [Validators.required, Validators.pattern(/^[\p{L}\s'-]+$/u)]],
        })
    }


    open(): void {
        this.visible = true;
    }

    close(): void {
        this.visible = false;
        this.validateForm.reset();
    }


}