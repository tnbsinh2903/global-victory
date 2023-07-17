import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { User_FindDTO, User_InfoItemDTO, User_ResponseLogin } from "libs/erp/api-interfaces/src/modules/users/UserDTOs";
import { __param } from "tslib";
import { UserDetailsComponent } from "../user-details/UserDetailsComponent";
import { UserUpsertComponent } from "../user-upsert/UserUpsertComponent";
import { HOST_API } from "libs/erp/api-interfaces/src/modules/api-service/APIService";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from "../user-service/UserService";
import { debounceTime, distinctUntilChanged, filter, fromEvent, map } from "rxjs";
import { RoleService } from "../../roles-management/role-service/RoleService";

@Component({
  templateUrl: "./UserListComponent.html",
  selector: "global-victory-user-list",
  styleUrls: ["./UserListComponent.css"]
})
export class UserListComponent implements AfterViewInit, OnInit {

  pageIndex: number = 1;
  pageLimit: number = 10;
  pageTotal?: number;
  total!: number;
  keyword!: string;

  loading: boolean = false;
  listUsers: User_InfoItemDTO[] = [];
  host_api = HOST_API;
  idxStart!: number;
  listPermissionOfUser?: Array<string>;
  currentUser?: User_ResponseLogin | null;
  showView: Boolean = false;
  showCreate: Boolean = false;
  showDelete: Boolean = false;
  showUpdate: Boolean = false;

  @ViewChild(UserDetailsComponent) userDetailsComponent?: UserDetailsComponent;
  @ViewChild(UserUpsertComponent) userUpsertComponent?: UserUpsertComponent;
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

  constructor(
    private readonly userService: UserService,
    private notification: NzNotificationService,
    private roleService: RoleService,
  ) { }

  checkPermission(): void {
    const { user } = JSON.parse(localStorage.getItem('authState') || '{}');
    this.roleService.getPermissionOfUserByEmail(user.email).subscribe((res) => {
      if (res.includes('@Permission/User/Create')) {
        this.showCreate = true;
      }
      if (res.includes('@Permission/User/Update')) {
        this.showUpdate = true;
      }
      if (res.includes('@Permission/User/Delete')) {
        this.showDelete = true;
      }
    });
  }

  createNotification(type: string, title: string, message: string): void {
    this.notification.create(
      type,
      title,
      message,
    );
  }

  ngAfterViewInit(): void {

  }
  userrs!: User_ResponseLogin | null;

  ngOnInit(): void {
    this.checkPermission();
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      })

      , filter(res => res.length > -1)

      // Time in milliseconds between key events
      , debounceTime(1000)

      // If previous query is diffent from current   
      , distinctUntilChanged()

      // subscription for response
    ).subscribe((text: string) => {
      this.loadData()
    }
    )
    this.loadData()
  }

  loadData() {
    this.loading = true;
    const filter: User_FindDTO = {
      _page: this.pageIndex || 1,
      _limit: this.pageLimit,
      _keyword: this.keyword || "",
    }

    if (this.keyword && this.keyword !== 'undefined') {
      filter._keyword = this.keyword;
    }

    this.userService.getAllUsers(filter).subscribe((data) => {
      this.listUsers = data.result;
      this.pageIndex = data._page;
      this.pageTotal = data._total_page;
      this.total = data._total;
      this.loading = false;
      this.idxStart = (data._page - 1) * data._limit + 1;
    }, (error) => {
      this.loading = false;
    })
  }

  showUserDetail(email: string) {
    this.userDetailsComponent?.showUserDetail(email)
  }

  showFormUpdate(email: string) {
    this.userUpsertComponent?.showFormUpsert(email)
  }

  cancel(): void {
  }

  confirmDelete(email: string): void {
    try {
      this.userService.deleteUserByEmail(email).subscribe(res => {
        this.createNotification(res.status, res.title, res.message);
        this.loadData();
      })
    } catch (error: any) {
      this.createNotification(error.status, error.title, error.message);
    }
  }

  reloadData() {
    this.loadData();
  }
}
