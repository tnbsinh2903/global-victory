import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Role_CreateDTO, Role_InfoDTO } from "@global-victory/erp/api-interfaces";
import { RoleService } from "../role-service/RoleService.component";
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
    selector: 'global-victory-create-role',
    templateUrl: './CreateRoles.component.html',
    styles: [
        `[nz-button] {
            margin-bottom  :10px
        }
        [btnCreate]{
            margin-left : 115px
        }
        `
    ]
})
export class CreateRolesComponent implements OnInit {

    constructor(
        private roleService: RoleService,
        private fb: UntypedFormBuilder,
        private readonly notification: NzNotificationService
    ) { }

    @Output() realoadData = new EventEmitter<any>

    createNotification(type: string, title: string, message: string): void {
        this.notification.create(
            type,
            title,
            message,
        );
    }

    validateForm!: UntypedFormGroup;

    visible = false;

    createRole(): void {
        if (this.validateForm.valid) {
            const data = this.validateForm.value;
            const createRole: Role_CreateDTO = {
                id: data.idRole!,
                name: data.nameRole
            }
            try {
                this.roleService.createRole(createRole).subscribe(res => {
                    this.createNotification(res.status, res.title, res.message);
                    this.realoadData.emit();
                    this.close();
                    this.validateForm.reset();
                })
            } catch (error: any) {
                this.createNotification(error.status, error.title, error.message);
            }
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
            nameRole: [null, [Validators.required, Validators.pattern("")]],
            idRole: [null, [Validators.required, Validators.pattern("")]],
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