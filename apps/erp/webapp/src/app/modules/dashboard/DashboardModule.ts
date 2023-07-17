import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NewsManagementComponent } from "../news-management/NewsManagementComponent";
import { PermissionGuard } from "../../guard/PermissionGuard";
import { BannerManagementComponent } from "../banner-management/BannerManagementComponent";
// import { DashboardComponent } from "./DashboardComponent";
import { CommonModule } from "@angular/common";
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NewsListComponent } from "../news-management/news-list/NewsListComponent";

// @NgModule({
//     imports: [
//         NzGridModule,
//         NzIconModule,
//         NzCardModule,
//         NzProgressModule,
//         CommonModule,
//         RouterModule.forChild([
//             {
//                 path: '',
//                 component: DashboardComponent,
//                 children: [
//                     {
//                         path: 'dashboard',
//                         component: DashboardComponent,
//                     }
//                 ]
//             },
//         ])
//     ],
//     declarations: [DashboardComponent],
//     providers: [],
//     exports: [DashboardComponent],
// })

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: NewsManagementComponent,
                children: [
                    {
                        path: 'news-management',
                        component: NewsListComponent,
                    }
                ]
            },
        ])
    ],
    declarations: [],
    providers:[NzNotificationService,NzModalService]
})
export class DashboardModule { }