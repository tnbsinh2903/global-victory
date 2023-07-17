
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role_FindOneDTO, Role_InfoDTO, Role_UpdateDTO, Role_deleteDTO } from 'libs/erp/api-interfaces/src/modules/roles/RoleDTOs';
import { Injectable } from '@angular/core';
import { Handle_Http_Response } from 'libs/erp/api-interfaces/src/common/types/HandleHttpResponse';
import { Role_CreateDTO } from '@global-victory/erp/api-interfaces';


@Injectable({
    providedIn: 'root'
})
export class PermissionService {

    constructor(private http: HttpClient) { }

    baseUrl = 'http://localhost:3333/api/roles';

    getAllRole(): Observable<Role_InfoDTO[]> {
        return this.http.get<Role_InfoDTO[]>(this.baseUrl);
    }

    getRoleById(id: string): Observable<Role_InfoDTO> {
        const url = `${this.baseUrl}/id/`;
        const roleFindOne: Role_FindOneDTO = {
            id: id,
        }
        return this.http.get<Role_InfoDTO>(url, { params: { ...roleFindOne } }).pipe();
    }

    createRole(role: Role_CreateDTO): Observable<Handle_Http_Response> {
        return this.http.post<Handle_Http_Response>(this.baseUrl, role).pipe();
    }

    changePermission(role: Role_UpdateDTO): Observable<Handle_Http_Response> {
        const url = `${this.baseUrl}/id/`
        return this.http.put<Handle_Http_Response>(url, role).pipe();
    }

    deleteRole(id: string): Observable<Handle_Http_Response> {
        const roleDelete: Role_deleteDTO = {
            id: id
        }
        const url = `${this.baseUrl}/id/`
        return this.http.delete<Handle_Http_Response>(url, { params: { ...roleDelete } }).pipe();
    }

}