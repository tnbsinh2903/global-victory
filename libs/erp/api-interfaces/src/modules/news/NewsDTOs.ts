import { IsNotEmpty, MaxLength } from "class-validator";
import { PaginationDTO } from "../../common";

export type News_FindDTO = PaginationDTO<{
    _keyword?: string;
    _sortField?: string | null;
    _sortOrder?: string | null;
    _filterField?: string | null;
    _filterValue?: string | Date[] | Array<string> | null
}>;

export type News_InfoItemDTO = {

    id: string;

    title: string;

    created_at: Date;

    updated_at: Date;

    hash_tag: Array<string>;

    pinned_top: boolean;

    created_by: string;
}

export type News_List_Response = {
    result: News_InfoItemDTO[],
    _next_page: number,
    _prev_page: number,
    _total: number,
    _total_page: number,
    _page: number,
    _limit: number,
}

export type News_InfoDetailDTO = {

    id: string;

    title: string;

    description: string;

    rich_text_content: string;

    image_cover_url: string;

    hash_tag: Array<string>;

    pinned_top: boolean;

    created_at: Date;

    created_by: string;

    updated_at: Date;

    updated_by: string;

}

export class News_CreateDTO {

    title!: string;

    description!: string

    rich_text_content!: string;

    hash_tag?: Array<string>;

    image_cover_url?: string;

    pinned_top!: boolean;
}

export class News_UpsertDTO {

    id?: string;

    @IsNotEmpty()
    title!: string;

    @IsNotEmpty()
    description?: string

    @IsNotEmpty()
    rich_text_content!: string;

    hash_tag?: Array<string>;

    image_cover_url?: string;

    pinned_top?: boolean;

    created_at?: Date;

    created_by?: string;

    updated_at?: Date;

    updated_by?: string;

    is_deleted?: boolean;
}

export type News_DeleteDTO = {
    id: string;
}

export type News_FindOneDTO = {
    id: string;
}

export type News_Defined = {
    id: string;
    title: string;
    description: string;
    rich_text_content: string;
    image_cover_url: string;
    hash_tag: string;
    pinned_top: boolean;
    created_at: Date;
    updated_at: Date;
    created_by: string;
    updated_by: string;
}

// export class Message_Response {
//     status!:string;
//     title!:string;
//     message!:string;
// }