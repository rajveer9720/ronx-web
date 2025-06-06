export interface IPagination {
  total_items: number;
  total_pages: number;
  current_page: number;
  page_size: number;
}

export interface IPaginate {
  page: number;
  limit: number;
}

export interface IPaginationModel {
  page: number;
  pageSize: number;
}
