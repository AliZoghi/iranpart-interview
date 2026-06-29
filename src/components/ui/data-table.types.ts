export interface DataTableColumn {
  key: string;
  label: string;
  headerClass?: string;
  cellClass?: string;
}

export type DataTableRow = Record<string, unknown>;
