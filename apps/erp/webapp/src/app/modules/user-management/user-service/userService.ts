import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import {
    UserListResponse,
    User_DeleteDTO,
    User_FindOneDTO,
    User_InfoDetailDTO,
    User_ResponseLogin,
    User_UpsertDTO,
} from 'libs/erp/api-interfaces/src/modules/users/UserDTOs';
import { HttpClient } from "@angular/common/http";
import { Handle_Http_Response } from "../../../../../../../../libs/erp/api-interfaces/src/common/types/HandleHttpResponse";
import { DELETE_USER, GET_ALL_USER, GET_USER_BY_EMAIL, REGISTER_USER, UPDATE_USER, UPLOAD_AVATAR_USER } from "../../../../../../../../libs/erp/api-interfaces/src/modules/api-service/APIService";

@Injectable({
    providedIn: "root"
})

export class UserService {
    token?: string | null;
    constructor(
        private http: HttpClient) {
    };

    getAllUsers(params: any): Observable<UserListResponse> {
        return this.http.get<UserListResponse>(GET_ALL_USER, {
            params: { ...params }
        })
    };

    getUserByEmail(email: string): Observable<User_InfoDetailDTO> {
        const userFindOneDTO: User_FindOneDTO = {
            email: email,
        }
        return this.http.get<User_InfoDetailDTO>(GET_USER_BY_EMAIL, { params: { ...userFindOneDTO } }).pipe();
    };
    
    createUser(user: User_UpsertDTO): Observable<Handle_Http_Response> {
        return this.http.post<Handle_Http_Response>(REGISTER_USER, user).pipe();
    };

    updateUser(user: User_UpsertDTO): Observable<Handle_Http_Response> {
        return this.http.put<Handle_Http_Response>(UPDATE_USER, user).pipe();
    };

    deleteUserByEmail(email: string): Observable<Handle_Http_Response> {
        const userDelete: User_DeleteDTO = {
            email: email,
        }
        return this.http.delete<Handle_Http_Response>(DELETE_USER,{ params: { ...userDelete } }).pipe()
    };

    uploadAvatar(file: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('upload', file)
        return this.http.post<any>(UPLOAD_AVATAR_USER, formData).pipe();
    };
}