import type { LocationQueryRaw } from "vue-router";
import { DEFAULT_PAGE } from "~/core/constants";
import {
  TicketStatus,
  type TicketStatusId,
  isKnownTicketStatusId,
} from "../constants/ticket-status";

export const TICKET_STATUS_QUERY_PARAM = {
  [TicketStatus.AwaitingResponse]: "awaiting-response",
  [TicketStatus.UnderReview]: "under-review",
  [TicketStatus.Answered]: "answered",
  [TicketStatus.Closed]: "closed",
} as const satisfies Record<TicketStatusId, string>;

export type TicketStatusQueryParam =
  (typeof TICKET_STATUS_QUERY_PARAM)[TicketStatusId];

export interface TicketsRouteFilter {
  search?: string;
  status?: TicketStatusQueryParam;
}

export interface TicketsRoutePagination {
  page: number;
}

const STATUS_ID_BY_QUERY_PARAM = Object.fromEntries(
  Object.entries(TICKET_STATUS_QUERY_PARAM).map(([statusId, queryParam]) => [
    queryParam,
    Number(statusId),
  ]),
) as Record<TicketStatusQueryParam, TicketStatusId>;

export interface TicketsRouteState {
  search: string;
  statusId: number | null;
  page: number;
}

export function statusIdToQueryParam(
  statusId: number,
): TicketStatusQueryParam | null {
  if (!isKnownTicketStatusId(statusId)) {
    return null;
  }

  return TICKET_STATUS_QUERY_PARAM[statusId] ?? null;
}

export function parseStatusQueryParam(value: unknown): number | null {
  if (typeof value !== "string" || !value) {
    return null;
  }

  const statusId = STATUS_ID_BY_QUERY_PARAM[value as TicketStatusQueryParam];

  return statusId ?? null;
}

function parseJsonObject(value: unknown): Record<string, unknown> | null {
  if (typeof value !== "string" || !value.trim()) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(value);

    if (
      typeof parsed !== "object" ||
      parsed === null ||
      Array.isArray(parsed)
    ) {
      return null;
    }

    return parsed as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function parseFilterQueryParam(value: unknown): TicketsRouteFilter {
  const parsed = parseJsonObject(value);

  if (!parsed) {
    return {};
  }

  const filter: TicketsRouteFilter = {};

  if (typeof parsed.search === "string") {
    filter.search = parsed.search;
  }

  if (typeof parsed.status === "string") {
    const statusId = parseStatusQueryParam(parsed.status);

    if (statusId !== null) {
      filter.status = parsed.status as TicketStatusQueryParam;
    }
  }

  return filter;
}

export function parsePaginationQueryParam(
  value: unknown,
): TicketsRoutePagination {
  const parsed = parseJsonObject(value);
  const pageValue = parsed?.page;
  const page = Number(pageValue);

  if (!Number.isFinite(page) || page < 1) {
    return { page: DEFAULT_PAGE };
  }

  return { page };
}

export function parseTicketsRouteQuery(
  query: LocationQueryRaw,
): TicketsRouteState {
  const filter = parseFilterQueryParam(query.filter);
  const pagination = parsePaginationQueryParam(query.pagination);

  return {
    search: filter.search ?? "",
    statusId: filter.status ? parseStatusQueryParam(filter.status) : null,
    page: pagination.page,
  };
}

export function buildTicketsRouteQuery(
  state: TicketsRouteState,
): LocationQueryRaw {
  const filter: TicketsRouteFilter = {};

  if (state.search.trim()) {
    filter.search = state.search.trim();
  }

  if (state.statusId !== null) {
    const status = statusIdToQueryParam(state.statusId);

    if (status) {
      filter.status = status;
    }
  }

  const pagination: TicketsRoutePagination = { page: state.page };
  const hasFilter = Object.keys(filter).length > 0;
  const hasPagination = state.page > DEFAULT_PAGE;

  if (!hasFilter && !hasPagination) {
    return {};
  }

  return {
    filter: JSON.stringify(filter),
    pagination: JSON.stringify(pagination),
  };
}

export function isSameTicketsRouteQuery(
  query: LocationQueryRaw,
  state: TicketsRouteState,
): boolean {
  const expected = buildTicketsRouteQuery(state);

  return (
    (expected.filter?.toString() ?? "") === (query.filter?.toString() ?? "") &&
    (expected.pagination?.toString() ?? "") ===
      (query.pagination?.toString() ?? "")
  );
}
