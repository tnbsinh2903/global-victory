import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Banner_FindDTO, Banner_InfoItemDTO, Product_InfoItemDTO } from "@global-victory/erp/api-interfaces";
import { HOST_API } from "libs/erp/api-interfaces/src/modules/api-service/APIService";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { debounceTime, distinctUntilChanged, fromEvent, map } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { RoleService } from "../../roles-management/role-service/RoleService";
import { ProductService } from "../product-service/ProductService";
import { ProductUpdateComponent } from "../product-update/ProductUpdateComponent";
import { ProductDetailComponent } from "../product-detail/ProductDetailComponent";

@Component({
    selector: 'global-victory-banner-list',
    templateUrl: './ProductListComponent.html',
    styleUrls: ['./ProductListComponent.css']
})
export class ProductListComponent implements AfterViewInit, OnInit {

    pageIndex: number = 1;
    pageLimit: number = 10;
    pageTotal?: number;
    total!: number;
    keyword!: string;
    loading: boolean = false;
    listProduct: Product_InfoItemDTO[] = [];
    host_api = HOST_API;
    idxStart!: number;
    visible = false;
    searchItem!: string;

    listPermissionOfUser: Array<string> = [];
    showView: Boolean = false;
    showCreate: Boolean = false;
    showDelete: Boolean = false;
    showUpdate: Boolean = false;

    constructor(
        private productService: ProductService,
        private notification: NzNotificationService,
        private roleService: RoleService,
    ) { }

    @ViewChild(ProductUpdateComponent) productUpdateComponent?: ProductUpdateComponent;
    @ViewChild(ProductDetailComponent) productDetailComponent?: ProductDetailComponent;
    @ViewChild('searchInput', { static: true }) searchInput!: ElementRef<HTMLInputElement>;


    checkPermission(): void {
        const { user } = JSON.parse(localStorage.getItem('authState') || '{}');
        this.roleService.getPermissionOfUserByEmail(user.email).subscribe((res) => {
            if (res.includes('@Permission/User/Create')) {
                this.showCreate = true;
            }
            if (res.includes('@Permission/User/Update')) {
                this.showUpdate = true;
            }
            if (res.includes('@Permission/User/Delete')) {
                this.showDelete = true;
            }
        });
    }

    createNotification(type: string, title: string, message: string): void {
        if (this.notification) {
            this.notification.remove();
        }
        this.notification.create(
            type,
            title,
            message,
            { nzDuration: 700 }
        );
    }

    ngAfterViewInit(): void {
        this.checkPermission();
        fromEvent(this.searchInput.nativeElement, 'input').pipe(map((event: any) => event.target.value),
            debounceTime(1000), distinctUntilChanged())
            .subscribe(keyword => {
                this.keyword = keyword.trim();
                this.pageIndex = 1;
                this.loadData()
            })
    }

    ngOnInit(): void {
        this.loadData();
        this.showCreate = false;
    }

    loadData() {

        this.loading = true;
        const filter: Banner_FindDTO = {
            _page: this.pageIndex || 1,
            _limit: this.pageLimit,
            _keyword: this.keyword || "",
        }

        if (this.keyword && this.keyword !== 'undefined') {
            filter._keyword = this.keyword;
        }

        this.productService.getAllProduct(filter).subscribe((data) => {
            this.listProduct = data.result;
            this.pageIndex = data._page;
            this.pageTotal = data._total_page;
            this.total = data._total;
            this.loading = false;
            this.idxStart = (data._page - 1) * data._limit + 1;
        }, (error: HttpErrorResponse) => {
            this.loading = false;
        })
    }

    showDetailProduct(id: string) {
        this.productDetailComponent?.detailProduct(id);
    }

    showFormUpdate(id: string) {
        this.productUpdateComponent?.showForm(id);
    }

    deleteBanner(id: string): void {
        this.productService.deleteProduct(id).subscribe(res => {
            this.createNotification(res.status, res.title, res.message)
            this.loadData();
        })
    }

    cancel() {
    }

    reloadData() {
        this.loadData()
    }
}