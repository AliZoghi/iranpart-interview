import { debounce } from "lodash";
import type { PaginatedResponse } from "~/core/api/pagination";
import { DEFAULT_PAGE } from "~/core/constants";
import { ticketsService } from "../services/tickets.service";
import type { TicketModel } from "../types/ticket.model";
import type { TicketsQueryParams } from "../types/ticket.query";
import { formatTicketDisplayId, resolveTicketDisplayDate } from "../utils/ticket-display";
import type { DataTableRow } from "~/components/ui/data-table.types";

type TicketsPagination = Omit<PaginatedResponse<TicketModel>, "items">;

const SEARCH_DEBOUNCE_MS = 300;

export function useTickets() {
  const config = useRuntimeConfig();
  const tickets = ref<TicketModel[]>([]);
  const pagination = ref<TicketsPagination | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const search = ref("");
  const selectedStatusId = ref<number | null>(null);
  const page = ref(DEFAULT_PAGE);

  const perPage = computed(() => config.public.defaultPageSize);

  const tableRows = computed<DataTableRow[]>(() =>
    tickets.value.map((ticket) => ({
      id: ticket.id,
      displayId: formatTicketDisplayId(ticket.id),
      title: ticket.title,
      departmentTitle: ticket.departmentTitle,
      statusId: ticket.statusId,
      statusLabel: ticket.statusLabel,
      dateFa: resolveTicketDisplayDate(ticket.createdAtFa, ticket.modifiedAtFa),
    })),
  );

  function buildQueryParams(overrides: Partial<TicketsQueryParams> = {}) {
    const params: TicketsQueryParams = {
      page: page.value,
      perPage: perPage.value,
      ...overrides,
    };

    if (search.value.trim()) {
      params.search = search.value.trim();
    }

    if (selectedStatusId.value !== null) {
      params.statusId = selectedStatusId.value;
    }

    return params;
  }

  async function fetchTickets(overrides: Partial<TicketsQueryParams> = {}) {
    loading.value = true;
    error.value = null;

    if (overrides.page !== undefined) {
      page.value = overrides.page;
    }

    try {
      const response = await ticketsService.getUserTickets(
        buildQueryParams(overrides),
      );

      tickets.value = response.items;
      pagination.value = {
        page: response.page,
        perPage: response.perPage,
        total: response.total,
        totalPages: response.totalPages,
      };
      page.value = response.page;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to fetch tickets";
    } finally {
      loading.value = false;
    }
  }

  const debouncedFetchTickets = debounce(() => {
    fetchTickets({ page: DEFAULT_PAGE });
  }, SEARCH_DEBOUNCE_MS);

  function setSearch(value: string) {
    search.value = value;
    debouncedFetchTickets();
  }

  function setSelectedStatusId(value: number | null) {
    selectedStatusId.value = value;
    fetchTickets({ page: DEFAULT_PAGE });
  }

  function setPage(nextPage: number) {
    fetchTickets({ page: nextPage });
  }

  return {
    tickets,
    tableRows,
    pagination,
    loading,
    error,
    search,
    selectedStatusId,
    page,
    fetchTickets,
    setSearch,
    setSelectedStatusId,
    setPage,
  };
}
