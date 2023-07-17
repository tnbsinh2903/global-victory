export type PaginationResultDTO<ResultDTO = unknown> = {
  result: ResultDTO[];
  _page: number | undefined;
  _limit: number | undefined;
  _total: number | undefined;
  _total_page: number | undefined;
  _next_page: number | undefined;
  _prev_page: number | undefined;
};

export type PaginationDTO<DTO = unknown> = {
  _page: number | undefined;
  _limit: number | undefined;
} & DTO;


