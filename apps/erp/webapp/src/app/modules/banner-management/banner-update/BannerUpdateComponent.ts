import { Component, ElementRef, EventEmitter, Output, ViewChild } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { BannerService } from "../banner-service/BannerService";
import { Banner_UpsertDTO } from "@global-victory/erp/api-interfaces";
import { REGEXP_LETTER, REGEXP_PARAGRAPH } from "../../../utils/ValidateUtil";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HttpErrorResponse } from "@angular/common/http";
import { HOST_API } from 'libs/erp/api-interfaces/src/modules/api-service/APIService';
import { Store } from "@ngrx/store";
import { selectUser } from "../../../state/auth/AuthReduce";



@Component({
    selector: 'global-victory-banner-update',
    templateUrl: './BannerUpdateComponent.html',
    styleUrls: ['./BannerUpdateComponent.css']
})
export class BannerUpdateComponent {

    @Output() reloadData = new EventEmitter<any>;
    @ViewChild('tasks') tasks!: ElementRef;

    constructor(
        private bannerService: BannerService,
        private fb: UntypedFormBuilder,
        private notification: NzNotificationService,
        private store: Store
    ) { }
    validateForm!: UntypedFormGroup;
    formBannerUpdate!: Banner_UpsertDTO;
    visible = false;
    imageBanner !: string;
    imageUrl !: string;
    host_api = HOST_API;
    isChecked = false;
    updated_by: string | undefined;
    fileImageBanner!: File;


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
            idBanner: [null],
            bannerName: [null, [Validators.required, Validators.pattern(REGEXP_LETTER)]],
            bannerParagraph: [null, [Validators.required, Validators.pattern(REGEXP_PARAGRAPH)]],
            bannerImage: [null],
            pinTop: [null]
        })
    }


    showForm(id: string) {
        this.visible = true;
        this.bannerService.getBannerById(id).subscribe(bannerData => {
            this.formBannerUpdate = {
                id: bannerData.id,
                banner_name: bannerData.banner_name,
                banner_paragraph: bannerData.banner_paragraph,
                banner_image_url: bannerData.banner_image_url,
                pin_top: bannerData.pin_top,
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
            const bannerUpdate: Banner_UpsertDTO = {
                id: data.idBanner,
                banner_name: data.bannerName,
                banner_paragraph: data.bannerParagraph,
                banner_image_url: this.imageBanner,
                pin_top: this.isChecked,
                updated_by: this.updated_by
            }
            this.bannerService.updateBanner(bannerUpdate).subscribe(res => {
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

    uploadBannerImage(event: any) {
        this.fileImageBanner = event.target.files[0];
        this.bannerService.uploadFile(this.fileImageBanner).subscribe(res => {
            this.imageBanner = res.imageFileName;
            this.imageUrl = `${HOST_API}/${res.imageFileName}`;
            this.formBannerUpdate.banner_image_url = this.imageBanner;
        }, (error: HttpErrorResponse) => {
            this.createNotification(error.error.status, error.error.title, error.error.message)

        })
    }


    pintop(event: any) {
        this.isChecked = event.target.checked;
    }

    showInputUpload() {
        this.tasks.nativeElement.click();
    }


    close() {
        this.visible = false
    }
}