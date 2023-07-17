import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { Role_InfoDTO, Role_UpdateDTO } from "@global-victory/erp/api-interfaces";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { PermissionService } from "../permission-service/PermissionService";

@Component({
    selector: 'global-victory-permission-detail',
    templateUrl: './PermissionDetailComponent.html',
    styleUrls: ['./PermissionDetailComponent.css']
})
export class PermissionDetailComponent {

    @ViewChild('myCheckbox') myCheckbox!: ElementRef;
    @Output() reloadData = new EventEmitter<any>


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
    isVisible = false;
    selectedId: string | undefined;
    selectedNameRole: string | undefined;
    isChecked = false;

    constructor(
        private permissionService: PermissionService,
        private notification: NzNotificationService,
    ) { }

    createNotification(type: string, title: string, message: string): void {
        if (this.notification) {
            this.notification.remove();
        }
        this.notification.create(
            type,
            title,
            message,
            { nzDuration: 600 }
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

    showDetail(id: string) {
        this.loading = true;
        this.loadData();
        this.selectedId = id;
        this.isVisible = true;
        this.listRoles.forEach(role => {
            if (role.id === id) {
                this.selectedNameRole = role.name;
            }
        })
    }

    confirm(id: string, name: string, permission: string, checkbox: HTMLInputElement) {

        const isChecked = checkbox.checked;
        checkbox.checked = !isChecked;
        const newsAssignPermission: Role_UpdateDTO = {
            id: id,
            module: name,
            permission: permission,
            action: checkbox.checked
        };
        this.permissionService.changePermission(newsAssignPermission).subscribe(res => {
            const assignPermission = "Assign Permission Successfully";
            const removePermission = "Remove Permission Successfully";
            if (checkbox.checked) {
                this.createNotification(res.status, res.title, assignPermission);
            } else {
                this.createNotification(res.status, res.title, removePermission);
            }
        }, (error: any) => {
            this.notification.error('Error', 'Error : ' + error.message);
        })
    }

    close(): void {
        this.isVisible = false;
        this.listPermissions = [];
        this.loadData();
        this.isChecked = false;
    }

    handleCancle() {
    }
}