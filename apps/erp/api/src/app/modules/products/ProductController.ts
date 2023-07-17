import { Body, Controller, Delete, Get, Inject, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './ProductService';
import { RolesGuard } from '../../auth/guard/RolesGuard';
import { Permission } from 'libs/erp/api-interfaces/src/utils/Enum';
import { BannerEndpoints, Message_Response, PaginationResultDTO, ProductEndpoints, Product_DeleteDTO, Product_FindDTO, Product_FindOneDTO, Product_InfoDetailDTO, Product_InfoItemDTO, Product_UpsertDTO } from '@global-victory/erp/api-interfaces';
import { RequirePermission } from '../../auth/decorator/RolesDecorator';
import { PaginationUtil } from '../../utils';

@Controller()
export class ProductController {
  constructor(private productService: ProductService) { }


  // @UseGuards(RolesGuard)
  // @RequirePermission(Permission.BANNER_VIEW)
  @Get(ProductEndpoints.Find)
  async find(@Query() payload: Product_FindDTO): Promise<PaginationResultDTO<Product_InfoItemDTO>> {
    const { _keyword } = payload;
    const { page, limit } = PaginationUtil.parseFromDTO(payload);
    const result = await this.productService.find(payload);

    return PaginationUtil.transformToPaginationResult<Product_InfoItemDTO>(
      result.result,
      page,
      limit,
      result._total
    )

  }

  // @UseGuards(RolesGuard)
  // @RequirePermission(Permission.BANNER_VIEW)
  @Get(ProductEndpoints.FindOne)
  async findOne(@Query() payload: Product_FindOneDTO): Promise<Product_InfoDetailDTO> {
    return await this.productService.findOne(payload.id);
  };

  // @UseGuards(RolesGuard)
  // @RequirePermission(Permission.BANNER_CREATE)
  @Post(ProductEndpoints.Create)
  async create(@Body() payload: Product_UpsertDTO): Promise<Message_Response> {

    return await this.productService.create({
      product_name: payload.product_name,
      product_density: payload.product_density,
      created_by: payload.created_by
    })
  }

  // @UseGuards(RolesGuard)
  // @RequirePermission(Permission.BANNER_UPDATE)
  @Put(ProductEndpoints.Update)
  async update(@Body() payload: Product_UpsertDTO): Promise<Message_Response> {

    return await this.productService.update({
      id: payload.id,
      product_name: payload.product_name,
      product_density: payload.product_density,
      created_by: payload.created_by,
      updated_by: payload.updated_by
    })
  }

  // @UseGuards(RolesGuard)
  // @RequirePermission(Permission.BANNER_DELETE)
  @Delete(ProductEndpoints.Delete)
  async delete(@Query() idBanner: Product_DeleteDTO): Promise<Message_Response> {
    return await this.productService.delete(idBanner.id);
  }
}
