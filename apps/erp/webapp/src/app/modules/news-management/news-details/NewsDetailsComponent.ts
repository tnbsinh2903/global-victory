import { Component, OnInit } from "@angular/core";
import { NewsService } from "../news-service/NewsService";
import { News_InfoDetailDTO } from "@global-victory/erp/api-interfaces";

@Component({
    templateUrl: 'NewsDetailsComponent.html',
    selector: 'global-victory-details-news',
    styleUrls: ['./NewsDetailsComponent.css']
})
export class NewsDetailsComponent implements OnInit {


    newsDetails!: News_InfoDetailDTO;
    loading: boolean = false;
    isVisible = false;

    constructor(private newsService: NewsService) { }

    ngOnInit(): void { }


    handleOk(): void {
        this.isVisible = false;
    }

    handleCancel(): void {
        this.isVisible = false;
    }
    showNewsDetails(id: string): void {
        this.loading = true;
        this.newsService.getNewsById(id).subscribe(news => {
            this.newsDetails = news;
            this.loading = false;
        }, (error) => {
            this.loading = false;
        }
        )
        this.isVisible = true;
    }

}