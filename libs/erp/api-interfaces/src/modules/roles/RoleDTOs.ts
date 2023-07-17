export type Role_FindOneDTO = {
    id: string;
};
export type Role_FindPermissionOfUserDTO = {
    email: string;
};

export type Role_InfoItemDTO = {
    id: string;
    name: string;
}
export type RolesListResponse = {
    result: Role_InfoDTO[],
    _next_page: number,
    _prev_page: number,
    _total: number,
    _total_page: number,
    _page: number,
    _limit: number,

}

export type Role_InfoDTO = {
    id: string;
    name?: string;
    permissions: Array<Object>;
    created_at?: Date;
    created_by?: string;
    updated_at?: Date;
    updated_by?: string;
}

export type Role_InfoDetailDTO = {
    id: string;
    name?: string;
    created_at?: Date;
    created_by?: string;
    updated_at?: Date;
    updated_by?: string;
}

export type Role_UpdateDTO = {
    id: string;
    module: string;
    permission: string;
    action: boolean;
}

export class Role_CreateDTO {
    id?: string;
    name?: string;
    permissions?: [];
    created_at?: Date;
    created_by?: string;
    updated_at?: Date;
    updated_by?: string;
}

export type Role_deleteDTO = {
    id: string;
}
