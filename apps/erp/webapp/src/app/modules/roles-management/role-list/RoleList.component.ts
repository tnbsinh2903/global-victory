import { Component, NgModule, OnInit } from "@angular/core";
import { Role_InfoDTO, Role_InfoItemDTO } from "@global-victory/erp/api-interfaces";
import { RoleService } from "../role-service/RoleService.component";
import { HOST_API } from "../../../_share/pathFile";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CreateRolesComponent } from './../create-role/CreateRoles.component';


@Component({
    selector: 'global-victory-roles-list',
    templateUrl: './RoleList.component.html',
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

    constructor(
        private roleService: RoleService,
        private notification: NzNotificationService) { }


    createNotification(type: string, title: string, message: string): void {
        this.notification.create(
            type,
            title,
            message,
        );
    }


    loading: boolean = false;
    total!: number;
    idxStart !: number;
    listRoles: Role_InfoDTO[] = [];
    host_api = HOST_API;

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

    open(): void {
        this.visible = true;
    }

    close(): void {
        this.visible = false;
    }

    ngOnInit(): void {
        this.loadData();
    }

    onCreateNewRole(role: Role_InfoDTO) {
        this.listRoles.push(role);
        this.total++;
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