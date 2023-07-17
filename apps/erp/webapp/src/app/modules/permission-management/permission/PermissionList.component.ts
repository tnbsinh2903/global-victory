import { Component, OnInit } from "@angular/core";
import { Role_InfoDTO, Role_UpdateDTO } from "@global-victory/erp/api-interfaces";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { PermissionService } from "../permission-service/PermissionService.component";

@Component({
    selector: 'global-victory-permission',
    templateUrl: './PermissionList.component.html',
    styles: [
        `[nz-button] {
            margin: 12px;
        }
        
        nz-checkbox-wrapper {
            margin: 10px 20px;
        } 

        .spinner {
      margin: 80px 450px; 
                 }
        `]
})
export class PermissionComponent implements OnInit {

    listOfModule = [
        { name: 'User-management', tag: 'User', permissions: ['View', 'Create', 'Update', 'Delete'] },
        { name: 'News-management', tag: 'News', permissions: ['View', 'Create', 'Update', 'Delete'] },
        { name: 'Product-management', tag: 'Product', permissions: ['View', 'Create', 'Update', 'Delete'] },
        { name: 'Banner-management', tag: 'Banner', permissions: ['View', 'Create', 'Update', 'Delete'] },
        { name: 'Role-management', tag: 'Role', permissions: ['View', 'Create', 'Update', 'Delete'] },
    ];


    listRoles: Role_InfoDTO[] = [];
    listPermissions: string[] = [];
    roleChange!: Role_InfoDTO;
    loading: boolean = false;

    constructor(
        private permissionService: PermissionService,
        private notification: NzNotificationService
    ) {

    }


    createNotification(type: string, title: string, message: string): void {
        this.notification.create(
            type,
            title,
            message,
        );
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

    checkPermission(id: string, tag: string, permission: string): boolean {
        const permissionCheck = '@Permission/' + tag + '/' + permission + '/' + id;
        return this.listPermissions.includes(permissionCheck)
    }

    isChecked = false;

    onCheckboxChange(id: string, event: any, name: string, permission: string) {

        const newsAssignPermission: Role_UpdateDTO = {
            id: id,
            module: name,
            permission: permission,
            action: event.target.checked
        };
        this.permissionService.changePermission(newsAssignPermission).subscribe(res => {
            const assignPermission = "Assign Permission Successfully";
            const removePermission = "Remove Permission Successfully";
            if (event.target.checked) {
                this.createNotification(res.status, res.title, assignPermission);
            } else {
                this.createNotification(res.status, res.title, removePermission);
            }
        })

    }

}