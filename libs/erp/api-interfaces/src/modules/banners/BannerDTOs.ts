import { IsNotEmpty, MaxLength } from "class-validator";
import { PaginationDTO } from "../../common";



export type Banner_InfoItemDTO = {
    id: string;
    banner_name: string;
    banner_paragraph: string;
    banner_image_url: string;
    pin_top: boolean;
    updated_at: Date;
}

export type Banner_InfoDetailDTO = {
    id: string;
    banner_name: string;
    banner_paragraph: string;
    banner_image_url: string;
    pin_top: boolean;
    created_by: string;
    created_at: Date;
    updated_at: Date;
    updated_by: string;
}

export type Banner_CreateDTO = {
    id?: string;
    banner_name: string;
    banner_paragraph: string;
    banner_image_url: string;
    pin_top: boolean;
    created_by: null;
}

export class Banner_UpsertDTO {

    id?: string;

    @IsNotEmpty()
    // @MaxLength(20)
    banner_name !: string;

    @IsNotEmpty()
    banner_paragraph!: string;

    // @IsNotEmpty()
    banner_image_url!: string;

    @IsNotEmpty()
    pin_top!: boolean;

    created_at?: Date;

    updated_at?: Date;

    updated_by?: string;

    created_by?: string;

    is_deleted?: boolean;
}


export type Banner_FindDTO = PaginationDTO<{
    _keyword?: string;
}>;

export type Banner_FindOneDTO = {
    id: string;
};

export type Banner_DeleteDTO = {
    id: string;
};

export type BannerListResponse = {
    result: Banner_InfoItemDTO[],
    _next_page: number,
    _prev_page: number,
    _total: number,
    _total_page: number,
    _page: number,
    _limit: number,
}