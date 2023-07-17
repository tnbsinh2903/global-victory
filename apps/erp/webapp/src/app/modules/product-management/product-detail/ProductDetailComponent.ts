import { Component, ViewEncapsulation } from "@angular/core";
import { HOST_API } from "libs/erp/api-interfaces/src/modules/api-service/APIService";
import { ProductService } from "../product-service/ProductService";
import { Product_InfoDetailDTO } from '@global-victory/erp/api-interfaces';

@Component({
    selector: 'global-victory-product-detail',
    templateUrl: './ProductDetailComponent.html',
    styleUrls: ['./ProductDetailComponent.css'],
    encapsulation: ViewEncapsulation.None
})

export class ProductDetailComponent {

    constructor(private productService: ProductService) {
    }

    isVisible = false;
    loading!: string;
    productDetail: Product_InfoDetailDTO = {} as Product_InfoDetailDTO;

    detailProduct(id: string) {
        this.isVisible = true;
        this.productService.getProductById(id).subscribe(banner => {
            this.productDetail = banner;
        })
    }

    close() {
        this.isVisible = false;
    }

}