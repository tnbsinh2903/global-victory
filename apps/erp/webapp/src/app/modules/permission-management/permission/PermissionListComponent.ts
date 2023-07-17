import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { Role_InfoDTO } from "@global-victory/erp/api-interfaces";
import { PermissionService } from "../permission-service/PermissionService";
import { PermissionDetailComponent } from "../permission-detail/PermissionDetailComponent";

@Component({
    selector: 'global-victory-list-permission',
    templateUrl: './PermissionListComponent.html',
    styles: [
        `[nz-button] {
            margin: 12px;
        }
        .spinner {
      margin: 180px 500px; 
                 }  
        `]
})
export class PermissionComponent implements AfterViewInit, OnInit {

    @ViewChild(PermissionDetailComponent) permissionDetailComponent?: PermissionDetailComponent;

    listRoles: Role_InfoDTO[] = [];
    listPermissions: string[] = [];
    roleChange!: Role_InfoDTO;
    loading: boolean = false;
    isCheckboxDisabled = false;

    constructor(
        private permissionService: PermissionService,
    ) { }

    ngAfterViewInit(): void {

    }

    ngOnInit(): void {
        this.loadData();
    }

    loadData() {
        this.loading = true;
        this.permissionService.getAllRole().subscribe((data) => {
            this.listRoles = data;
            data.forEach(role => {
                role.permissions.forEach(permission => {
                    this.listPermissions.push(Object.values(permission)[0] + '/' + role.id)
                })
            })
            this.loading = false;
        }, (error) => {
            this.loading = false;
        })
    }

    showDetail(id: string) {
        this.permissionDetailComponent?.showDetail(id)
    }

    reloadData() {
        this.loadData()
    }

}