import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CommonModule } from "@angular/common";
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { PermissionComponent } from "./permission/PermissionList.component";
import { PermissionManagementComponent } from "./PermissionManagement.componet";
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAlertModule } from 'ng-zorro-antd/alert';


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
        NzAlertModule,
        RouterModule.forChild([
            {
                path: "",
                component: PermissionManagementComponent,
                children: [
                    {
                        path: "permission-management",
                        component: PermissionComponent
                    },

                ],

            }

        ]),

    ],
    declarations: [PermissionComponent, PermissionManagementComponent]
})

export class PermissionManagementModule { }