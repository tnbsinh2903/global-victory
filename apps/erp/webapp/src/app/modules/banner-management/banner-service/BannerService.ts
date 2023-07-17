import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BannerListResponse, Banner_CreateDTO, Banner_DeleteDTO, Banner_FindOneDTO, Banner_InfoDetailDTO, Banner_InfoItemDTO, Banner_UpsertDTO, Message_Response } from "@global-victory/erp/api-interfaces";
import { Handle_Http_Response } from "libs/erp/api-interfaces/src/common/types/HandleHttpResponse";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class BannerService {

    constructor(private http: HttpClient) { }
    baseUrl = 'http://localhost:3333/api/banners';


    getAllBanner(params: any): Observable<BannerListResponse> {
        return this.http.get<BannerListResponse>(this.baseUrl, { params: { ...params } })
    }

    getBannerById(id: string): Observable<Banner_InfoDetailDTO> {
        const url = `${this.baseUrl}/id/`;
        const bannerId: Banner_FindOneDTO = {
            id: id
        };
        return this.http.get<Banner_InfoDetailDTO>(url, { params: { ...bannerId } }).pipe();
    }

    createBanner(payload: Banner_UpsertDTO): Observable<Handle_Http_Response> {
        return this.http.post<Handle_Http_Response>(this.baseUrl, payload).pipe()
    }

    updateBanner(payload: Banner_UpsertDTO): Observable<Handle_Http_Response> {
        const url = `${this.baseUrl}/id/`;
        return this.http.put<Handle_Http_Response>(url, payload).pipe();
    }

    deleteBanner(id: string): Observable<Handle_Http_Response> {
        const url = `${this.baseUrl}/id/`;
        const bannerId: Banner_DeleteDTO = {
            id: id
        };
        return this.http.delete<Handle_Http_Response>(url, { params: { ...bannerId } }).pipe();
    }
    uploadFile(file: File): Observable<any> {
        const url = `${this.baseUrl}/upload`;
        const formDate: FormData = new FormData;
        formDate.append('upload', file);
        return this.http.post<any>(url, formDate).pipe();
    }
}