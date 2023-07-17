import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { RolesManagementComponent } from "./RolesManagement.component";
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RoleListComponent } from "./role-list/RoleList.component";
import { NzFormModule } from 'ng-zorro-antd/form';
import { CreateRolesComponent } from "./create-role/CreateRoles.component";
import { CommonModule } from "@angular/common";
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@NgModule({
    imports: [
        NzSelectModule,
        FormsModule,
        NzPopconfirmModule,
        NzNotificationModule,
        ReactiveFormsModule,
        CommonModule,
        NzIconModule,
        NzTableModule,
        NzCheckboxModule,
        NzButtonModule,
        NzDrawerModule,
        NzFormModule,
        NzSpinModule,

        RouterModule.forChild([
            {
                path: "",
                component: RolesManagementComponent,
                children: [

                    {
                        path: 'role-management',
                        component: RoleListComponent
                    }
                ],

            }

        ]),

    ],
    declarations: [RolesManagementComponent, CreateRolesComponent, RoleListComponent]
})

export class RolesManagementModule { }