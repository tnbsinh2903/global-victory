import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { User_UpsertDTO } from 'libs/erp/api-interfaces/src/modules/users/UserDTOs';
import { NzDrawerPlacement, NzDrawerSize } from 'ng-zorro-antd/drawer';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { REGEXP_LETTER, REGEXP_PASSWORD, REGEXP_PHONE } from '../../../utils/ValidateUtil';
import { UserService } from '../user-service/UserService';
import { HttpErrorResponse } from '@angular/common/http';
import { HOST_API } from 'libs/erp/api-interfaces/src/modules/api-service/APIService';
import { RoleService } from '../../roles-management/role-service/RoleService';
import { Role_InfoDTO } from '@global-victory/erp/api-interfaces';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../state/auth/AuthReduce';

@Component({
  selector: 'global-victory-user-create',
  templateUrl: "./UserCreateComponent.html",
  styleUrls: ["./UserCreateComponent.css"]
})
export class UserCreateComponent implements OnInit {

  @Output() reloadData = new EventEmitter<any>;

  constructor(
    private notification: NzNotificationService,
    private fb: UntypedFormBuilder,
    private userService: UserService,
    private roleService: RoleService,
    private store: Store,
  ) { };

  createNotification(type: string, title: string, message: string): void {
    this.notification.create(
      type,
      title,
      message,
    );
  };

  fileAvatar!: File;
  imageURL!: string;
  avatarURL!: string;
  loading: boolean = false;
  validateForm!: UntypedFormGroup;
  errorMessage!: string;
  host_api: string = HOST_API;
  roleList: Role_InfoDTO[] | undefined;
  created_by: string | undefined

  @ViewChild('tasks') tasks!: ElementRef;

  submitForm(): void {
    this.store.select(selectUser).subscribe((user) => {
      this.created_by = user?.display_name
    })
    if (this.validateForm.valid) {
      const data = this.validateForm.value;
      const userCreate: User_UpsertDTO = {
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        middle_name: data.middleName,
        display_name: data.displayName,
        password: data.password,
        date_of_birth: data.dateOfBirth,
        phone: data.phone,
        address: data.address,
        avatar_url: this.avatarURL,
        created_at: undefined,
        updated_at: undefined,
        created_by: this.created_by,
        role: data.roles.name
      }
      this.userService.createUser(userCreate).subscribe(res => {
        this.createNotification(res.status, res.title, res.message);
        this.imageURL = "";
        this.reloadData.emit();
        this.close();
        this.validateForm.reset();
      },
        (error: HttpErrorResponse) => {
          // this.createNotification(error.error.status, error.error.title, error.error.message);
          console.log(error)
        })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  };

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.validateForm.controls['checkPassword'].updateValueAndValidity());
  };

  confirmationValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };


  ngOnInit(): void {
    this.roleService.getAllRole().subscribe((role) => {
      this.roleList = role;
    })

    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      firstName: [null, [Validators.required, Validators.pattern(REGEXP_LETTER)]],
      lastName: [null, [Validators.required, Validators.pattern(REGEXP_LETTER)]],
      middleName: [null, [Validators.pattern(REGEXP_LETTER)]],
      displayName: [null, [Validators.required, Validators.pattern(REGEXP_LETTER)]],
      password: [null, [Validators.required, Validators.pattern(REGEXP_PASSWORD)]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      dateOfBirth: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern(REGEXP_PHONE)]],
      address: [null],
      avatar: [null],
      roles: [null]
    });
  };

  uploadAvatar(event: any) {
    this.fileAvatar = event.target.files[0];
    this.userService.uploadAvatar(this.fileAvatar).subscribe(res => {
      this.avatarURL = res.imageFileName;
      this.imageURL = HOST_API + '/' + res.imageFileName;
    }), (error: any) => {
      alert('Upload Error!');
    }
  };

  showInputFileAvatar() {
    this.tasks.nativeElement.click();
  };

  visible = false;
  placement: NzDrawerPlacement = 'right';
  nzSize: NzDrawerSize = 'large';

  open(): void {
    this.visible = true;
  };

  close(): void {
    this.visible = false;
    this.validateForm.reset();
    this.imageURL = "";
  };
}
