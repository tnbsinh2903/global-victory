import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Banner_UpsertDTO, Product_UpsertDTO } from "@global-victory/erp/api-interfaces";
import { ProductService } from "../product-service/ProductService";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HOST_API } from "libs/erp/api-interfaces/src/modules/api-service/APIService";
import { REGEXP_LETTER, REGEXP_PARAGRAPH } from "../../../utils/ValidateUtil";
import { HttpErrorResponse } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { selectUser } from "../../../state/auth/AuthReduce";


@Component({
    selector: 'global-victory-product-create',
    templateUrl: './ProductCreateComponent.html',
    styleUrls: ['./ProductCreateComponent.css']
})
export class ProductCreateComponent implements OnInit {

    constructor(
        private productService: ProductService,
        private fb: UntypedFormBuilder,
        private notification: NzNotificationService,
        private store: Store,
    ) { }

    validateForm!: UntypedFormGroup;
    visible = false;
    inputValue!: string;
    isChecked = false;
    created_by: string | undefined
    @Output() reloadData = new EventEmitter<any>
    @ViewChild('tasks') tasks!: ElementRef;


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


    createBanner(): void {
        this.store.select(selectUser).subscribe((res) => {
            this.created_by = res?.display_name
        })
        if (this.validateForm.valid) {
            const data = this.validateForm.value;
            const createProduct: Product_UpsertDTO = {
                product_name: data.productName,
                product_density: data.productDensity,
                created_by: this.created_by
            }
            this.productService.createProduct(createProduct).subscribe(res => {
                this.createNotification(res.status, res.title, res.message);
                this.reloadData.emit();
                this.close();
                this.validateForm.reset()
            }, (error: HttpErrorResponse) => {
                this.createNotification(error.error.status, error.error.title, error.error.message)

            })
        }
        else {
            Object.values(this.validateForm.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
        }
    }

    pintop(event: any) {
        this.isChecked = event.target.checked;
    }

    showInputUpload() {
        this.tasks.nativeElement.click();
    }

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            productName: [null, [Validators.required, Validators.pattern(REGEXP_LETTER)]],
            productDensity: [null, [Validators.required, Validators.pattern("")]],
        })
    }


    open() {
        this.visible = true
    }

    close() {
        this.visible = false
        this.validateForm.reset();
    }
}