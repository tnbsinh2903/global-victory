import {
    Component,
    ElementRef,
    EventEmitter,
    OnInit,
    Output,
    ViewChild
} from "@angular/core";
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators
} from "@angular/forms";
import { User_UpsertDTO } from "libs/erp/api-interfaces/src/modules/users/UserDTOs";
import { NzDrawerPlacement, NzDrawerSize } from "ng-zorro-antd/drawer";
import { HOST_API } from "libs/erp/api-interfaces/src/modules/api-service/APIService";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { REGEXP_LETTER, REGEXP_PASSWORD, REGEXP_PHONE } from "../../../utils/ValidateUtil";
import { UserService } from "../user-service/UserService";
import { RoleService } from "../../roles-management/role-service/RoleService";
import { Role_InfoDTO } from "@global-victory/erp/api-interfaces";
import { Store } from "@ngrx/store";
import { selectUser } from "../../../state/auth/AuthReduce";
@Component({
    selector: "global-victory-user-upsert",
    templateUrl: './UserUpsertComponent.html',
    styleUrls: ["./UserUpsertComponent.css"]
})
export class UserUpsertComponent implements OnInit {
    @Output() reloadData = new EventEmitter<any>;

    fileAvatar!: File;
    imageURL!: string;
    avatarURL!: string;
    loading: boolean = false;
    validateForm!: UntypedFormGroup;
    userUpdate!: User_UpsertDTO;
    errorMessage?: string;
    host_api = HOST_API;
    roleList: Role_InfoDTO[] | undefined;
    updated_by: string | undefined

    @ViewChild('tasks') tasks!: ElementRef;

    createNotification(type: string, title: string, message: string): void {
        this.notification.create(
            type,
            title,
            message,
        );
    }

    constructor(
        private fb: UntypedFormBuilder,
        private userService: UserService,
        private notification: NzNotificationService,
        private roleService: RoleService,
        private store: Store,
    ) { }

    visible = false;
    placement: NzDrawerPlacement = 'right';
    nzSize: NzDrawerSize = 'large';

    submitForm(): void {
        this.store.select(selectUser).subscribe((user) => {
            this.updated_by = user?.display_name
        })
        if (this.validateForm.valid) {
            const data = this.validateForm.value;
            const userUpdate: User_UpsertDTO = {
                email: data.email,
                first_name: data.firstName,
                last_name: data.lastName,
                middle_name: data.middleName,
                display_name: data.displayName,
                password: data.password,
                date_of_birth: data.dateOfBirth,
                phone: data.phone,
                address: data.address,
                avatar_url: this.userUpdate.avatar_url,
                updated_by: this.updated_by,
                role: data.roles?.name || this.userUpdate.role,
            }
            try {
                this.userService.updateUser(userUpdate).subscribe(res => {
                    this.createNotification(res.status, res.title, res.message);
                    this.validateForm.reset();
                    this.reloadData.emit();
                    this.close();
                })
            } catch (error: any) {
                this.createNotification(error.status, error.title, error.message);
            }
        } else {
            Object.values(this.validateForm.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
        }
    }

    ngOnInit(): void {
        this.roleService.getAllRole().subscribe((role) => {
            this.roleList = role;
        });

        this.validateForm = this.fb.group({
            email: [null, [Validators.email, Validators.required]],
            firstName: [null, [Validators.required, Validators.pattern(REGEXP_LETTER)]],
            lastName: [null, [Validators.required, Validators.pattern(REGEXP_LETTER)]],
            middleName: [null, [Validators.pattern(REGEXP_LETTER)]],
            displayName: [null, [Validators.required, Validators.pattern(REGEXP_LETTER)]],
            password: [null, [Validators.pattern(REGEXP_PASSWORD)]],
            dateOfBirth: [null, [Validators.required]],
            phone: [null, [Validators.required, Validators.pattern(REGEXP_PHONE)]],
            address: [null],
            avatar: [null],
            roles: [null]
        });
    }
    uploadAvatar(event: any) {
        this.fileAvatar = event.target.files[0];
        this.userService.uploadAvatar(this.fileAvatar).subscribe(res => {
            this.userUpdate.avatar_url = res.imageFileName;
        }), (error: any) => {
        }
    }

    showFormUpsert(email: string) {
        this.visible = true;
        this.userService.getUserByEmail(email).subscribe(user => {
            this.userUpdate = {
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                middle_name: user.middle_name,
                display_name: user.display_name,
                password: "",
                date_of_birth: new Date(user.date_of_birth),
                phone: user.phone,
                address: user.address,
                avatar_url: user.avatar_url,
                role: user.role
            };
        }, (error) => {
            this.errorMessage = error;
            this.loading = false;
        }
        )
    }

    showInputFileAvatar() {
        this.tasks.nativeElement.click();
    }

    close(): void {
        this.visible = false;
        this.validateForm.reset();
    }
}