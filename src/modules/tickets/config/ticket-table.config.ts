import type { DataTableColumn } from "~/components/ui/data-table.types";

export const TICKET_TABLE_COLUMNS: DataTableColumn[] = [
  {
    key: "subject",
    label: "شناسه / موضوع تیکت",
    headerClass: "w-[38%] align-top text-right",
    cellClass: "w-[38%] align-top text-right",
  },
  {
    key: "department",
    label: "دپارتمان",
    headerClass: "w-[18%] align-top text-right",
    cellClass: "w-[18%] align-top text-right",
  },
  {
    key: "status",
    label: "وضعیت",
    headerClass: "w-[22%] align-top text-right",
    cellClass: "w-[22%] align-top text-right",
  },
  {
    key: "updatedAt",
    label: "آخرین بروزرسانی",
    headerClass: "w-[22%] align-top text-right",
    cellClass: "w-[22%] align-top text-right",
  },
];
