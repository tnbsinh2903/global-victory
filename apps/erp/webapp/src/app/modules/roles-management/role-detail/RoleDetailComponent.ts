import { Component, ViewEncapsulation } from "@angular/core";
import { HOST_API } from "libs/erp/api-interfaces/src/modules/api-service/APIService";
import { Banner_InfoDetailDTO, Role_InfoDetailDTO } from '@global-victory/erp/api-interfaces';
import { RoleService } from "../role-service/RoleService";
import { Store } from "@ngrx/store";
import { selectUser } from "../../../state/auth/AuthReduce";

@Component({
    selector: 'global-victory-role-detail',
    templateUrl: './RoleDetailComponent.html',
    styleUrls: ['./RoleDetailComponent.css'],
    encapsulation: ViewEncapsulation.None
})

export class RolesDetailComponent {

    constructor(private rolesService: RoleService) {
    }

    isVisible = false;
    loading!: string;
    host_api = HOST_API;
    rolesDetail: Role_InfoDetailDTO = {} as Role_InfoDetailDTO;

    detailRole(id: string) {
        this.isVisible = true;
        this.rolesService.getRoleById(id).subscribe(roles => {

            this.rolesDetail = roles;
        })
    }

    close() {
        this.isVisible = false;
    }

}