import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { News_FindDTO, News_InfoItemDTO } from "libs/erp/api-interfaces/src/modules/news/NewsDTOs";
import { NewsService } from "../news-service/NewsService";
import { NewsDetailsComponent } from "../news-details/NewsDetailsComponent";
import { NewsUpsertComponent } from "../news-upsert/NewsUpSertComponent";
import { debounceTime, distinctUntilChanged, filter, fromEvent, map } from "rxjs";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Store } from '@ngrx/store';
import { selectPermissions } from "../../../state/auth/AuthReduce";

@Component({
    templateUrl: "./NewsListComponent.html",
    selector: "global-victory-news-list",
    styleUrls: ["./NewsListComponent.css"]
})
export class NewsListComponent implements OnInit {

    searchHashTagValue = '';
    visible = false;
    readMore: boolean = false;
    loading: boolean = false;
    pageIndex: number = 1;
    pageLimit: number = 10;
    keyword!: string;
    pageTotal?: number;
    total!: number;
    idxStart!: number;
    listNews: News_InfoItemDTO[] = [];

    listPermissionOfUser: Array<string> = [];
    showView: Boolean = false;
    showCreate: Boolean = false;
    showDelete: Boolean = false;
    showUpdate: Boolean = false;

    filterPinnedTop = [
        { text: 'True', value: 'true' },
        { text: 'Fasle', value: 'false' }
    ];

    @ViewChild(NewsDetailsComponent) newsDetailsComponent?: NewsDetailsComponent;
    @ViewChild(NewsUpsertComponent) newsUpsertComponent?: NewsUpsertComponent;
    @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

    constructor(
        private newsService: NewsService,
        private notification: NzNotificationService,
        private store: Store,
    ) { }

    getPermissions(): void {
        this.store.select(selectPermissions).subscribe((permission) => (
            this.listPermissionOfUser = permission
        ));
    }

    checkPermission(): void {
        this.listPermissionOfUser?.forEach(element => {
            element === "@Permission/News/View" ? this.showView = true :
                element === "@Permission/News/Create" ? this.showCreate = true :
                    element === "@Permission/News/Update" ? this.showUpdate = true :
                        element === "@Permission/News/Delete" ? this.showDelete = true : null;
        });
    }


    createNotification(type: string, title: string, message: string): void {
        this.notification.create(
            type,
            title,
            message,
        );
    }

    ngOnInit(): void {
        this.getPermissions();
        this.checkPermission();
        fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
            map((event: any) => {
                return event.target.value;
            })
            , filter(res => res.length > -1)

            // Time in milliseconds between key events
            , debounceTime(1000)

            // If previous query is diffent from current   
            , distinctUntilChanged()

            // subscription for response
        ).subscribe((text: string) => {
            this.loadData()
        }
        )
        this.loadData()
    }

    loadData() {
        this.loading = true;
        const filter: News_FindDTO = {
            _page: this.pageIndex || 1,
            _limit: this.pageLimit,
            _keyword: this.keyword || "",
            _sortField: null,
            _sortOrder: null,
            _filterField: null,
            _filterValue: null,

        }

        if (this.keyword && this.keyword !== 'undefined') {
            filter._keyword = this.keyword;
        }

        this.newsService.getAllNews(filter).subscribe((data) => {
            this.listNews = data.result;
            this.pageIndex = data._page;
            this.pageTotal = data._total_page;
            this.total = data._total;
            this.loading = false;
            this.idxStart = (data._page - 1) * data._limit + 1;
        }, (error) => {
            this.loading = false;
        })
    };

    confirmDelete(id: string): void {
        try {
            this.newsService.deleteNewsById(id).subscribe(res => {
                this.createNotification(res.status, res.title, res.message);
                this.loadData();
            })
        } catch (error: any) {
            this.createNotification(error.status, error.title, error.message);
        }
    }

    cancel(): void {

    }

    showFormUpdate(id: string) {
        this.newsUpsertComponent?.showFormUpdate(id);
    }

    showNewsDetail(id: string) {
        this.newsDetailsComponent?.showNewsDetails(id);
    }

    reloadData() {
        this.loadData();
    }

    sortData(fieldSort: string | null, optionSort: string | null) {
        this.loading = true;
        const filter: News_FindDTO = {
            _page: this.pageIndex || 1,
            _limit: this.pageLimit,
            _keyword: this.keyword || "",
            _sortField: fieldSort,
            _sortOrder: optionSort,
        }

        if (this.keyword && this.keyword !== 'undefined') {
            filter._keyword = this.keyword;
        }

        this.newsService.getAllNews(filter).subscribe((data) => {
            this.listNews = data.result;
            this.pageIndex = data._page;
            this.pageTotal = data._total_page;
            this.total = data._total;
            this.loading = false;
            this.idxStart = (data._page - 1) * data._limit + 1;
        }, (error) => {
            this.loading = false;
        })
    };

    onQueryParamsChange(params: NzTableQueryParams): void {
        const { pageSize, pageIndex, sort, filter } = params;
        const currentSort = sort.find(item => item.value !== null);
        const sortField = (currentSort && currentSort.key) || null;
        const sortOrder = (currentSort && currentSort.value) || null;

        const currentField = filter.find(item => item.value.length > 0);
        const filterField = (currentField && currentField.key) || null;
        const filterValue = (currentField && currentField.value.toString()) || null;

        if (filterField !== null) {
            const _filterField = filterField;
            const _filterValue = filterValue;
            this.filterData(_filterField, _filterValue)
        } else {
            if (sortOrder !== null) {
                this.sortData(sortField, sortOrder);
            } else {
                this.loadData()
            }
        }
    }

    filterData(filterField: string | null, filterValue: Array<string> | string | null): void {
        this.loading = true;
        const filter: News_FindDTO = {
            _page: this.pageIndex || 1,
            _limit: this.pageLimit,
            _keyword: this.keyword || "",
            _filterField: filterField,
            _filterValue: filterValue,
        }

        if (this.keyword && this.keyword !== 'undefined') {
            filter._keyword = this.keyword;
        }

        this.newsService.getAllNews(filter).subscribe((data) => {
            this.listNews = data.result;
            this.pageIndex = data._page;
            this.pageTotal = data._total_page;
            this.total = data._total;
            this.loading = false;
            this.idxStart = (data._page - 1) * data._limit + 1;
        }, (error) => {
            this.loading = false;
        })
    }

    dateUpdatedAt = null;
    dateCreatedAt = null;

    onChangeDateCreate(result: Date[]): void {
        const filterField = "CreatedAt";
        const listDateFilter: Array<string> = result.map(item => new Date(item).toISOString().split('T')[0]);
        result.length === 0 ? this.reloadData() : this.filterData(filterField, listDateFilter)
    }

    onChangeDateUpdate(result: Date[]): void {
        const filterField = "UpdatedAt";
        const listDateFilter: Array<string> = result.map(item => new Date(item).toISOString().split('T')[0]);
        result.length === 0 ? this.reloadData() : this.filterData(filterField, listDateFilter);
    }

    reset(): void {
        this.searchHashTagValue = '';
        this.loadData()
    }

    filterHashtag(): void {
        const filterField = "HashTag";
        this.filterData(filterField, this.searchHashTagValue)
    }
}