import { IsNotEmpty, MaxLength } from "class-validator";
import { PaginationDTO } from "../../common";

export type Product_InfoItemDTO = {
    id: string;
    product_name: string;
    product_density: string;
    updated_at: Date;
}

export type Product_InfoDetailDTO = {
    id: string;
    product_name: string;
    product_density: string;
    created_by: string;
    created_at: Date;
    updated_at: Date;
    updated_by: string;
}


export class Product_UpsertDTO {

    id?: string;

    @IsNotEmpty()
    product_name!: string;

    @IsNotEmpty()
    product_density!: string;

    created_at?: Date;

    updated_at?: Date;

    updated_by?: string;

    created_by?: string;

    is_deleted?: boolean;
}


export type Product_FindDTO = PaginationDTO<{
    _keyword?: string;
}>;

export type Product_FindOneDTO = {
    id: string;
};

export type Product_DeleteDTO = {
    id: string;
};


export type ProductListResponse = {
    result: Product_InfoItemDTO[],
    _next_page: number,
    _prev_page: number,
    _total: number,
    _total_page: number,
    _page: number,
    _limit: number,
}