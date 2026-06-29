export const TICKET_STATUS_ALL = null as null;

export enum TicketStatus {
  AwaitingResponse = 9,
  UnderReview = 10,
  Answered = 11,
  Closed = 12,
}

export const TICKET_STATUS = {
  AWAITING_RESPONSE: TicketStatus.AwaitingResponse,
  UNDER_REVIEW: TicketStatus.UnderReview,
  ANSWERED: TicketStatus.Answered,
  CLOSED: TicketStatus.Closed,
} as const;

export type TicketStatusId = (typeof TICKET_STATUS)[keyof typeof TICKET_STATUS];

export interface TicketStatusFilter {
  label: string;
  statusId: number | null;
}

const STATUS_LABELS: Record<TicketStatusId, string> = {
  [TicketStatus.AwaitingResponse]: "در انتظار پاسخ",
  [TicketStatus.UnderReview]: "در حال بررسی",
  [TicketStatus.Answered]: "پاسخ داده شده",
  [TicketStatus.Closed]: "بسته شده",
};

export const TICKET_STATUS_FILTERS: TicketStatusFilter[] = [
  { label: "همه", statusId: TICKET_STATUS_ALL },
  {
    label: STATUS_LABELS[TicketStatus.AwaitingResponse],
    statusId: TICKET_STATUS.AWAITING_RESPONSE,
  },
  {
    label: STATUS_LABELS[TicketStatus.UnderReview],
    statusId: TICKET_STATUS.UNDER_REVIEW,
  },
  {
    label: STATUS_LABELS[TicketStatus.Answered],
    statusId: TICKET_STATUS.ANSWERED,
  },
  {
    label: STATUS_LABELS[TicketStatus.Closed],
    statusId: TICKET_STATUS.CLOSED,
  },
];

export function isKnownTicketStatusId(
  statusId: number,
): statusId is TicketStatusId {
  return statusId in STATUS_LABELS;
}

export function getTicketStatusLabel(statusId: number): string {
  if (isKnownTicketStatusId(statusId)) {
    return STATUS_LABELS[statusId];
  }

  return "نامشخص";
}
