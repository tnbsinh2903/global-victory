import { Component, OnInit, ViewChild } from "@angular/core";
import { Role_InfoDTO } from "@global-victory/erp/api-interfaces";
import { RoleService } from "../role-service/RoleService";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { RolesDetailComponent } from "../role-detail/RoleDetailComponent";

@Component({
    selector: 'global-victory-roles-list',
    templateUrl: './RoleListComponent.html',
    styles: [
        `
        [nz-button] {
            margin: 12px;
                    }
        .spinner {
            margin: 80px 450px; 

                 }
                    `],
})
export class RoleListComponent implements OnInit {

    @ViewChild(RolesDetailComponent) rolesDetailComponent?: RolesDetailComponent;

    constructor(
        private roleService: RoleService,
        private notification: NzNotificationService) { }


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

    loading: boolean = false;
    total!: number;
    idxStart !: number;
    listRoles: Role_InfoDTO[] = [];

    visible = false;

    loadData() {
        this.loading = true;
        this.roleService.getAllRole().subscribe((data) => {
            this.listRoles = data
            this.loading = false;
        }, (error) => {
            this.loading = false;
        })
    }

    showDetailRole(id: string) {
        this.rolesDetailComponent?.detailRole(id);
    }

    open(): void {
        this.visible = true;
    }

    close(): void {
        this.visible = false;
    }

    ngOnInit(): void {
        this.loadData();
    }

    reloadData() {
        this.loadData();
    }

    deleteRole(id: string): void {
        try {
            this.roleService.deleteRole(id).subscribe(res => {
                this.createNotification(res.status, res.title, res.message);
                this.loadData();

            })
        } catch (error: any) {
            this.createNotification(error.status, error.title, error.message);
        }
    }

    cancel(): void {

    }
}