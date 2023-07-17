import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzPopoverModule } from "ng-zorro-antd/popover";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { ProductManagementComponent } from "./ProductManagementComponent";
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { ProductListComponent } from "./product-list/ProductListComponent";
import { ProductCreateComponent } from "./product-create/ProductCreateComponent";
import { ProductUpdateComponent } from "./product-update/ProductUpdateComponent";
import { ProductDetailComponent } from "./product-detail/ProductDetailComponent";


@NgModule({
  imports: [
    NzCheckboxModule,
    NzDescriptionsModule,
    NzAlertModule,
    NzDrawerModule,
    NzAvatarModule,
    NzPaginationModule,
    NzImageModule,
    NzUploadModule,
    NzPopconfirmModule,
    NzSpinModule,
    CommonModule,
    NzTableModule,
    NzPopoverModule,
    NzDropDownModule,
    NzGridModule,
    NzStatisticModule,
    NzDrawerModule,
    NzIconModule,
    NzModalModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzDatePickerModule,
    NzNotificationModule,
    RouterModule.forChild([
      {
        path: "",
        component: ProductManagementComponent,
        children: [
          {
            path: "product-management",
            component: ProductListComponent,
          },
        ],
      },
    ]),
  ],
  declarations: [ProductManagementComponent, ProductListComponent, ProductCreateComponent, ProductUpdateComponent, ProductDetailComponent],
})

export class ProductManagementModule { }
