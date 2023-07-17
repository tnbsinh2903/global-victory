import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Banner_DeleteDTO, Banner_FindOneDTO, Banner_InfoDetailDTO, Banner_UpsertDTO, ProductListResponse, Product_DeleteDTO, Product_InfoDetailDTO, Product_UpsertDTO } from "@global-victory/erp/api-interfaces";
import { Handle_Http_Response } from "libs/erp/api-interfaces/src/common/types/HandleHttpResponse";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class ProductService {

    constructor(private http: HttpClient) { }
    baseUrl = 'http://localhost:3333/api/products';


    getAllProduct(params: any): Observable<ProductListResponse> {
        return this.http.get<ProductListResponse>(this.baseUrl, { params: { ...params } })
    }

    getProductById(id: string): Observable<Product_InfoDetailDTO> {
        const url = `${this.baseUrl}/id/`;
        const bannerId: Banner_FindOneDTO = {
            id: id
        };
        return this.http.get<Product_InfoDetailDTO>(url, { params: { ...bannerId } }).pipe();
    }

    createProduct(payload: Product_UpsertDTO): Observable<Handle_Http_Response> {
        return this.http.post<Handle_Http_Response>(this.baseUrl, payload).pipe()
    }

    updateProduct(payload: Product_UpsertDTO): Observable<Handle_Http_Response> {
        const url = `${this.baseUrl}/id/`;
        return this.http.put<Handle_Http_Response>(url, payload).pipe();
    }

    deleteProduct(id: string): Observable<Handle_Http_Response> {
        const url = `${this.baseUrl}/id/`;
        const bannerId: Product_DeleteDTO = {
            id: id
        };
        return this.http.delete<Handle_Http_Response>(url, { params: { ...bannerId } }).pipe();
    }
}