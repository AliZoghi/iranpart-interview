import type { DataTableColumn } from "~/components/ui/data-table.types";

export const TICKET_TABLE_COLUMNS: DataTableColumn[] = [
  {
    key: "subject",
    label: "شناسه / موضوع تیکت",
  },
  {
    key: "department",
    label: "دپارتمان",
  },
  {
    key: "status",
    label: "وضعیت",
  },
  {
    key: "updatedAt",
    label: "آخرین بروزرسانی",
    headerClass: "text-left",
    cellClass: "text-left",
  },
];
