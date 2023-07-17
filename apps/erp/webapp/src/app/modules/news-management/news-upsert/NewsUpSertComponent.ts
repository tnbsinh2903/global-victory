import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NewsService } from "../news-service/NewsService";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { News_UpsertDTO } from "@global-victory/erp/api-interfaces";

@Component({
    templateUrl: 'NewsUpSertComponent.html',
    selector: 'global-victory-upsert-news',
    styleUrls: ['./NewsUpSertComponent.css']
})
export class NewsUpsertComponent implements OnInit {

    @Output() reloadData = new EventEmitter<any>;

    newsUpdate!: News_UpsertDTO;
    loading: boolean = false;
    validateForm!: UntypedFormGroup;
    public htmlData: string = "";
    public readonly: boolean = true;
    public data!: string;
    retrieveddata: string = "";
    switchValue = false;
    currentDay = new Date();
    isVisible = false;

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
    ) {
    }

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            title: [null, [Validators.required]],
            description: [null, [Validators.required]],
            content: [null, [Validators.required]],
            pintop: [null],
        });
    }

    changeContent(event) {
        this.htmlData = event;
    }

    submitForm(): void {
        if (this.validateForm.valid) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(this.htmlData, 'text/html');
            const imageCoverUrl = doc.querySelector('img')?.getAttribute('src') || undefined;
            const hasTagList = this.findHashtags(this.htmlData);
            const data = this.validateForm.value;
            const newsUpsert: News_UpsertDTO = {
                id: this.newsUpdate.id,
                title: data.title,
                description: data.description,
                rich_text_content: data.content,
                hash_tag: hasTagList,
                image_cover_url: imageCoverUrl,
                pinned_top: this.switchValue,
            }
            try {
                this.newsService.updateNews(newsUpsert).subscribe(res => {
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

    findHashtags(content: string): string[] {
        const regexp = /\B\#\w\w+\b/g;
        const result = content.match(regexp);
        if (result) {
            return result;
        } else {
            return [];
        }
    }

    handleOk(): void {
        this.isVisible = false;
    }

    handleCancel(): void {
        this.isVisible = false;
    }

    showFormUpdate(id: string): void {
        this.isVisible = true;
        this.loading = true;
        this.newsService.getNewsById(id).subscribe(news => {
            this.newsUpdate = {
                id: news.id,
                title: news.title,
                description: news.description,
                rich_text_content: news.rich_text_content,
                hash_tag: news.hash_tag,
                image_cover_url: news.image_cover_url,
                pinned_top: news.pinned_top,
            };
            this.switchValue  = news.pinned_top;

            this.loading = false;
        }, (error) => {
            this.loading = false;
        }
        )
    }

    changeSwitch(event) {
        this.switchValue = !this.switchValue;
        console.log(this.switchValue)
    }

    onReady(editor) {
    }
}