import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { News_DeleteDTO, News_FindOneDTO, News_InfoDetailDTO, News_List_Response, News_UpsertDTO } from 'libs/erp/api-interfaces/src/modules/news/NewsDTOs'
import { Handle_Http_Response } from "libs/erp/api-interfaces/src/common/types/HandleHttpResponse";
import { CREATE_NEWS, DELETE_NEWS, GET_ALL_NEWS, GET_NEWS_DETAILS_BY_ID, UPDATE_NEWS, UPLOAD_IMAGE_NEWS } from "libs/erp/api-interfaces/src/modules/api-service/APIService";

@Injectable({
    providedIn: "root",
})
export class NewsService {
    constructor(private http: HttpClient) { }
    getAllNews(params: any): Observable<News_List_Response> {
        return this.http.get<News_List_Response>(GET_ALL_NEWS, { params: { ...params } })
    };

    getNewsById(id: string): Observable<News_InfoDetailDTO> {
        const newsFindOneDTO: News_FindOneDTO = {
            id: id,
        }
        return this.http.get<News_InfoDetailDTO>(GET_NEWS_DETAILS_BY_ID, { params: { ...newsFindOneDTO } }).pipe();
    };

    createNews(user: News_UpsertDTO): Observable<Handle_Http_Response> {
        return this.http.post<Handle_Http_Response>(CREATE_NEWS, user).pipe();
    }

    updateNews(user: News_UpsertDTO): Observable<Handle_Http_Response> {
        return this.http.put<Handle_Http_Response>(UPDATE_NEWS, user).pipe();
    };

    deleteNewsById(id: string): Observable<Handle_Http_Response> {
        const newsDeleteDTO: News_DeleteDTO = {
            id: id,
        }
        return this.http.delete<Handle_Http_Response>(DELETE_NEWS, { params: { ...newsDeleteDTO } }).pipe()
    };

    uploadImageCover(file: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('upload', file)
        return this.http.post<any>(UPLOAD_IMAGE_NEWS, formData).pipe();
    };
}