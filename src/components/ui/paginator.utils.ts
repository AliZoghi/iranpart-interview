export type PaginatorItem =
  | { type: "page"; page: number }
  | { type: "ellipsis"; key: string };

export function buildPaginatorItems(
  currentPage: number,
  totalPages: number,
  siblingCount = 1,
): PaginatorItem[] {
  if (totalPages <= 0) {
    return [];
  }

  if (totalPages === 1) {
    return [{ type: "page", page: 1 }];
  }

  const pages = new Set<number>([1, totalPages]);

  for (
    let page = currentPage - siblingCount;
    page <= currentPage + siblingCount;
    page += 1
  ) {
    if (page >= 1 && page <= totalPages) {
      pages.add(page);
    }
  }

  const sortedPages = [...pages].sort((a, b) => a - b);
  const items: PaginatorItem[] = [];
  let previousPage = 0;

  for (const page of sortedPages) {
    if (previousPage && page - previousPage > 1) {
      items.push({ type: "ellipsis", key: `ellipsis-${previousPage}-${page}` });
    }

    items.push({ type: "page", page });
    previousPage = page;
  }

  return items;
}
