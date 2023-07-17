import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NewsManagementComponent } from "./NewsManagementComponent";
import { NzListModule } from 'ng-zorro-antd/list';
import { NewsListComponent } from "./news-list/NewsListComponent";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NewsCreateComponent } from "./news-create/NewsCreateComponent";
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { MyCkEditorComponent } from "../../ckeditor/my-ck-editor/my-ck-editor.component";
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NewsDetailsComponent } from "./news-details/NewsDetailsComponent";
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NewsUpsertComponent } from "./news-upsert/NewsUpSertComponent";
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { PermissionGuard } from "../../guard/PermissionGuard";

@NgModule({
    imports: [
        NzDatePickerModule,
        NzDropDownModule,
        NzTagModule,
        NzPopconfirmModule,
        NzSwitchModule,
        NzNotificationModule,
        NzTabsModule,
        CKEditorModule,
        NzInputModule,
        NzButtonModule,
        NzDrawerModule,
        NzPaginationModule,
        ReactiveFormsModule,
        FormsModule,
        NzTableModule,
        NzFormModule,
        NzIconModule,
        CommonModule,
        NzListModule,
        NzModalModule,
        NzSpinModule,
        RouterModule.forChild([
            {
                path: "",
                component: NewsManagementComponent,
                children: [
                    {
                        path: "news-management",
                        component: NewsListComponent,
                    },
                ]
            }
        ])
    ],
    declarations: [NewsManagementComponent, NewsListComponent, NewsCreateComponent, NewsDetailsComponent, NewsUpsertComponent, MyCkEditorComponent],
})
export class NewsManagementModule { }
