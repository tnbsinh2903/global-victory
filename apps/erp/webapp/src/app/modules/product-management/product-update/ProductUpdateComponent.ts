import { Component, ElementRef, EventEmitter, Output, ViewChild } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ProductService } from "../product-service/ProductService";
import { Product_UpsertDTO } from "@global-victory/erp/api-interfaces";
import { REGEXP_LETTER, REGEXP_PARAGRAPH } from "../../../utils/ValidateUtil";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HttpErrorResponse } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { selectUser } from "../../../state/auth/AuthReduce";



@Component({
    selector: 'global-victory-product-update',
    templateUrl: './ProductUpdateComponent.html',
    styleUrls: ['./ProductUpdateComponent.css']
})
export class ProductUpdateComponent {

    @Output() reloadData = new EventEmitter<any>;
    @ViewChild('tasks') tasks!: ElementRef;

    constructor(
        private productService: ProductService,
        private fb: UntypedFormBuilder,
        private notification: NzNotificationService,
        private store: Store
    ) { }
    validateForm!: UntypedFormGroup;
    formProductUpdate!: Product_UpsertDTO;
    visible = false;
    isChecked = false;
    updated_by: string | undefined;


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

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            idProduct: [null],
            productName: [null, [Validators.required, Validators.pattern(REGEXP_LETTER)]],
            productDensity: [null, [Validators.required, Validators.pattern("")]],
        })
    }


    showForm(id: string) {
        this.visible = true;
        this.productService.getProductById(id).subscribe(bannerData => {
            this.formProductUpdate = {
                id: bannerData.id,
                product_name: bannerData.product_name,
                product_density: bannerData.product_density,
            }
        }, (error: HttpErrorResponse) => {
            this.createNotification(error.error.status, error.error.title, error.error.message)

        })
    }


    updateBanner() {
        this.store.select(selectUser).subscribe((res) => {
            this.updated_by = res?.display_name
        })
        if (this.validateForm.valid) {
            const data = this.validateForm.value;
            const bannerUpdate: Product_UpsertDTO = {
                id: data.idProduct,
                product_name: data.productName,
                product_density: data.productDensity,
                updated_by: this.updated_by
            }
            this.productService.updateProduct(bannerUpdate).subscribe(res => {
                this.createNotification(res.status, res.title, res.message);
                this.validateForm.reset();
                this.reloadData.emit();
                this.close()
            }, ((error: HttpErrorResponse) => {
                this.createNotification(error.error.status, error.error.title, error.error.message);
            })
            )
        } else {
            Object.values(this.validateForm.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
        }

    }


    close() {
        this.visible = false
    }
}