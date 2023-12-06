import { PaginationLinks } from './pagination-links';
import { PaginationMetaData } from './pagination-meta-data';

export class PaginationPage<T> {
  items: T[];
  meta: PaginationMetaData;
  links: PaginationLinks;
}
