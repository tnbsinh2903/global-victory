import { Component, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { NzAnchorModule } from "ng-zorro-antd/anchor";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { CommonModule } from '@angular/common';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageService } from "ng-zorro-antd/message";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { SignInService } from "../../auth/SignIn/SignInService";
import { localStorageKey, selectUser } from "../../state/auth/AuthReduce";
import { NzAvatarModule } from "ng-zorro-antd/avatar";
import { Store } from "@ngrx/store";
import { NzModalService } from 'ng-zorro-antd/modal';
import { RoleService } from "../../modules/roles-management/role-service/RoleService";
import { HOST_API } from "libs/erp/api-interfaces/src/modules/api-service/APIService";

@Component({
  standalone: true,
  selector: "global-victory-app-layout",
  imports: [
    NzPopconfirmModule,
    NzAvatarModule,
    NzDropDownModule,
    CommonModule,
    NzLayoutModule,
    NzIconModule,
    RouterModule,
    NzAnchorModule,
    NzMenuModule,
    NzToolTipModule,
    NzPopconfirmModule,
  ],
  providers: [NzMessageService],
  templateUrl: "AppLayoutComponent.html",
  styleUrls: ['./AppLayoutComponent.css'],
})
export class AppLayoutComponent implements OnInit {

  constructor(public router: Router,
    private signInService: SignInService,
    private store: Store,
    private modal: NzModalService,
    private nzMessageService: NzMessageService,
    private roleService: RoleService,

  ) { }

  isCollapsed = false;
  showUser = false;
  showRole = false;
  showPermission = false;
  showProduct = false;
  showNews = false;
  showBanner = false;
  listPermissionOfUser: Array<string> = [];
  displayName: string | undefined;
  avatar_url: string | undefined;
  host_api = HOST_API;

  ngOnInit(): void {
    this.store.select(selectUser).subscribe((res) => {
      this.displayName = res?.display_name;
      this.avatar_url = res?.avatar_url;
    })
    const { user } = JSON.parse(localStorage.getItem('authState') || '{}');
    this.roleService.getPermissionOfUserByEmail(user.email).subscribe((res) => {
      if (res.includes('@Permission/User/View')) {
        this.showUser = true;
      }
      if (res.includes('@Permission/Banner/View')) {
        this.showBanner = true;
      }
      if (res.includes('@Permission/Product/View')) {
        this.showProduct = true;
      }
      if (res.includes('@Permission/News/View')) {
        this.showNews = true;
      }
      if (res.includes('@Permission/Role/View')) {
        this.showRole = true;
      }
    });
  }

  cancel(): void {
    this.nzMessageService.info('click cancel');
  }

  confirm(): void {
    this.nzMessageService.info('click confirm');
  }
  logout() {
    this.modal.confirm({
      nzCloseIcon: '',
      nzTitle: 'Notification',
      nzContent: 'You have sure Log out ?',
      nzOkText: 'Log Out',
      nzCancelText: "No",
      nzOnOk: () => {
        localStorage.removeItem(localStorageKey);
        this.signInService.logout().subscribe(() => {
          this.router.navigateByUrl('sign-in')
        })
      }
    });
  }

}
