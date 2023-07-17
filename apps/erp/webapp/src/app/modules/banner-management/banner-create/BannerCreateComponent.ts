import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Banner_UpsertDTO } from "@global-victory/erp/api-interfaces";
import { BannerService } from "../banner-service/BannerService";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HOST_API } from "libs/erp/api-interfaces/src/modules/api-service/APIService";
import { REGEXP_LETTER, REGEXP_PARAGRAPH } from "../../../utils/ValidateUtil";
import { HttpErrorResponse } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { selectUser } from "../../../state/auth/AuthReduce";


@Component({
    selector: 'global-victory-banner-create',
    templateUrl: './BanenrCreateComponent.html',
    styleUrls: ['./BannerCreateComponent.css']
})
export class BannerCreateComponent implements OnInit {

    constructor(
        private bannerService: BannerService,
        private fb: UntypedFormBuilder,
        private notification: NzNotificationService,
        private store: Store,
    ) { }

    validateForm!: UntypedFormGroup;
    visible = false;
    fileImageBanner!: File;
    imageBanner !: string;
    imageUrl !: string;
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
            const createBanner: Banner_UpsertDTO = {
                banner_name: data.bannerName,
                banner_paragraph: data.bannerParagraph,
                banner_image_url: this.imageBanner,
                pin_top: this.isChecked,
                created_by: this.created_by
            }
            this.bannerService.createBanner(createBanner).subscribe(res => {
                this.createNotification(res.status, res.title, res.message);
                this.imageUrl = "";
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

    uploadBannerImage(event: any) {
        this.fileImageBanner = event.target.files[0];
        this.bannerService.uploadFile(this.fileImageBanner).subscribe(res => {
            this.imageBanner = res.imageFileName;
            this.imageUrl = HOST_API + "/" + res.imageFileName;
        }, (error: HttpErrorResponse) => {
            this.createNotification(error.error.status, error.error.title, error.error.message)

        })
    }

    showInputUpload() {
        this.tasks.nativeElement.click();
    }

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            bannerName: [null, [Validators.required, Validators.pattern(REGEXP_LETTER)]],
            bannerParagraph: [null, [Validators.required, Validators.pattern(REGEXP_PARAGRAPH)]],
            bannerImage: [null],
            pinTop: [null]
        })
    }


    open() {
        this.visible = true
    }

    close() {
        this.visible = false
        this.validateForm.reset();
        this.imageUrl = "";
    }
}