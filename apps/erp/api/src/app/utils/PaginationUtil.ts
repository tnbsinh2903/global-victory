import {
  PaginationDTO,
  PaginationResultDTO
} from '@global-victory/erp/api-interfaces';
import { GlobalConfig } from '../../config';

const defaultPage = GlobalConfig.Pagination.PageDefault;
const defaultLimit = GlobalConfig.Pagination.LimitDefault;
const maxLimitPerPage = GlobalConfig.Pagination.LimitMaximum;

export class PaginationUtil {
  static parseFromDTO(dto: PaginationDTO): {
    page: number;
    limit: number;
  } {
    const { _limit, _page } = dto;
    const page = isNaN(_page) ? defaultPage : +_page;
    let limit = isNaN(_limit) ? defaultLimit : +_limit;

    if (limit > maxLimitPerPage) limit = maxLimitPerPage;

    return {
      page,
      limit,
    };
  }

  static transformToPaginationResult<ResultDTO = unknown>
    (result_list: ResultDTO[],
      page: number,
      limit: number,
      total: number
    ): PaginationResultDTO<ResultDTO> {
    return {
      _next_page: 1,
      _prev_page: 1,
      _total: total,
      _total_page: total > limit ? ((Math.floor(total / limit) % 2 == 0) ? Math.floor(total / limit) : Math.floor(total / limit) + 1) : 1,
      _page: page,
      _limit: limit,
      result: result_list,
    };
  }
}
