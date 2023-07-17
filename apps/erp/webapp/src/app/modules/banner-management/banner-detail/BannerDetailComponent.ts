import { Component, ViewEncapsulation } from "@angular/core";
import { HOST_API } from "libs/erp/api-interfaces/src/modules/api-service/APIService";
import { BannerService } from "../banner-service/BannerService";
import { Banner_InfoDetailDTO } from '@global-victory/erp/api-interfaces';

@Component({
    selector: 'global-victory-banner-detail',
    templateUrl: './BannerDetailComponent.html',
    styleUrls: ['./BannerDetailComponent.css'],
    encapsulation: ViewEncapsulation.None
})

export class BannerDetailComponent {

    constructor(private bannerService: BannerService) {
    }

    isVisible = false;
    loading!: string;
    host_api = HOST_API
    bannerDetail: Banner_InfoDetailDTO = {} as Banner_InfoDetailDTO;

    detailBanner(id: string) {
        this.isVisible = true;
        this.bannerService.getBannerById(id).subscribe(banner => {
            this.bannerDetail = banner;
        })
    }

    close() {
        this.isVisible = false;
    }

}