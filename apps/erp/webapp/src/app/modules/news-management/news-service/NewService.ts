import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { News_CreateDTO, News_DeleteDTO, News_FindOneDTO, News_InfoDetailDTO, News_List_Response, News_Upsert } from 'libs/erp/api-interfaces/src/modules/news/NewsDTOs'
import { Handle_Http_Response } from "libs/erp/api-interfaces/src/common/types/HandleHttpResponse";

@Injectable({
    providedIn: "root",
})
export class NewsService {
    baseURL = 'http://localhost:3333/api/news';
    constructor(private http: HttpClient) { }
    getAllNews(params: any): Observable<News_List_Response> {
        return this.http.get<News_List_Response>(this.baseURL, { params: { ...params } })
    };

    getNewsById(id: string): Observable<News_InfoDetailDTO> {
        const url = `${this.baseURL}/id/`;
        const newsFindOneDTO: News_FindOneDTO = {
            id: id,
        }
        return this.http.get<News_InfoDetailDTO>(url, { params: { ...newsFindOneDTO } }).pipe();
    };

    createNews(user: News_CreateDTO): Observable<Handle_Http_Response> {
        return this.http.post<Handle_Http_Response>(this.baseURL, user).pipe();
    }

    updateUser(user: News_Upsert): Observable<Handle_Http_Response> {
        const url = `${this.baseURL}/id`;
        return this.http.put<Handle_Http_Response>(url, user).pipe();
    };

    deleteNewsById(id: string): Observable<Handle_Http_Response> {
        const newsDeleteDTO: News_DeleteDTO = {
            id: id,
        }
        const url = `${this.baseURL}/id/`;
        return this.http.delete<Handle_Http_Response>(url, { params: { ...newsDeleteDTO } }).pipe()
    };

    uploadImageCover(file: File): Observable<any> {
        const url = `${this.baseURL}/upload`;
        const formData: FormData = new FormData();
        formData.append('image_cover_url', file)
        return this.http.post<any>(url, formData).pipe();
    };
}