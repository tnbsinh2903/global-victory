import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NewsService } from "../news-service/NewsService";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { News_CreateDTO, News_UpsertDTO } from "@global-victory/erp/api-interfaces";
import { Store } from "@ngrx/store";
import { selectUser } from "../../../state/auth/AuthReduce";

@Component({
    templateUrl: 'NewsCreateComponent.html',
    selector: 'global-victory-create-news',
    styleUrls: ['./NewsCreateComponent.css']
})
export class NewsCreateComponent implements OnInit {
    @Output() reloadData = new EventEmitter<any>;

    validateForm!: UntypedFormGroup;
    public htmlData: string = "";
    public readonly: boolean = true;
    public data!: string;
    retrieveddata: string = "";
    switchValue = false;
    currentDay = new Date();
    isVisible = false;
    created_by: string | undefined;

    createNotification(type: string, title: string, message: string): void {
        this.notification.create(
            type,
            title,
            message,
        );
    }

    constructor(
        private notification: NzNotificationService,
        private fb: UntypedFormBuilder,
        private newsService: NewsService,
        private store: Store,
    ) {
    }

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            title: [null, [Validators.required]],
            description: [null, [Validators.required]],
            content: [null, [Validators.required]],
            hashTag: [null],
            pintop: [null],
        });
    }

    changeContent(event) {
        this.htmlData = event;
    }

    submitForm(): void {
        this.store.select(selectUser).subscribe(user => {
            this.created_by = user?.display_name
        })
        if (this.validateForm.valid) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(this.htmlData, 'text/html');
            const imageCoverUrl = doc.querySelector('img')?.getAttribute('src') || undefined;
            const data = this.validateForm.value;
            const newsCreate: News_UpsertDTO = {
                title: data.title,
                description: data.description,
                rich_text_content: data.content,
                hash_tag: data.hashTag.split(' '),
                image_cover_url: imageCoverUrl,
                pinned_top: this.switchValue,
                created_by: this.created_by,
            }
            try {
                this.newsService.createNews(newsCreate).subscribe(res => {
                    this.createNotification(res.status, res.title, res.message);
                    this.handleCancel();
                    this.validateForm.reset();
                    this.reloadData.emit();
                })
            } catch (error: any) {
                this.createNotification(error.status, error.title, error.message);
            }
        } else {
            Object.values(this.validateForm.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
        }
    }

    handleOk(): void {
        this.isVisible = false;
    }

    handleCancel(): void {
        this.isVisible = false;
        this.validateForm.reset();
        this.switchValue = false;
    }
    showFormCreate(): void {
        this.isVisible = true;
    }

    changeSwitch(event) {
        this.switchValue = !this.switchValue;
    }

    onReady(editor) {

    }
}