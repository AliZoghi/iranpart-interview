import debounce from "lodash/debounce";
import type { LocationQueryRaw } from "vue-router";
import type { PaginatedResponse } from "~/core/api/pagination";
import { DEFAULT_PAGE } from "~/core/constants";
import { ticketsService } from "../services/tickets.service";
import type { TicketModel } from "../types/ticket.model";
import type { TicketsQueryParams } from "../types/ticket.query";
import {
  formatTicketDisplayId,
  resolveTicketDisplayDate,
} from "../utils/ticket-display";
import {
  buildTicketsRouteQuery,
  isSameTicketsRouteQuery,
  parseTicketsRouteQuery,
} from "../utils/ticket-route-query";
import type { DataTableRow } from "~/components/ui/data-table.types";

type TicketsPagination = Omit<PaginatedResponse<TicketModel>, "items">;

const SEARCH_DEBOUNCE_MS = 300;

export function useTickets() {
  const config = useRuntimeConfig();
  const route = useRoute();
  const router = useRouter();

  const tickets = ref<TicketModel[]>([]);
  const pagination = ref<TicketsPagination | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const search = ref("");
  const selectedStatusId = ref<number | null>(null);
  const page = ref(DEFAULT_PAGE);
  const isSyncingRoute = ref(false);

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

  function getRouteState() {
    return {
      search: search.value,
      statusId: selectedStatusId.value,
      page: page.value,
    };
  }

  function applyRouteQuery(query: LocationQueryRaw = route.query) {
    const routeState = parseTicketsRouteQuery(query);
    search.value = routeState.search;
    selectedStatusId.value = routeState.statusId;
    page.value = routeState.page;
  }

  async function syncRouteQuery() {
    const nextQuery = buildTicketsRouteQuery(getRouteState());

    if (isSameTicketsRouteQuery(route.query, getRouteState())) {
      return;
    }

    isSyncingRoute.value = true;

    try {
      await router.replace({
        path: route.path,
        query: nextQuery,
      });
    } finally {
      isSyncingRoute.value = false;
    }
  }

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

  async function fetchTickets(
    overrides: Partial<TicketsQueryParams> = {},
    options: { syncRoute?: boolean } = {},
  ) {
    const { syncRoute = true } = options;
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

      if (syncRoute) {
        await syncRouteQuery();
      }
    } catch (err) {
      tickets.value = [];
      pagination.value = null;
      error.value =
        err instanceof Error ? err.message : "Failed to fetch tickets";
    } finally {
      loading.value = false;
    }
  }

  const debouncedFetchTickets = debounce(async () => {
    page.value = DEFAULT_PAGE;
    await fetchTickets({ page: DEFAULT_PAGE });
  }, SEARCH_DEBOUNCE_MS);

  function initFromRoute() {
    applyRouteQuery();
  }

  async function setSearch(value: string) {
    search.value = value;
    await debouncedFetchTickets();
  }

  async function setSelectedStatusId(value: number | null) {
    selectedStatusId.value = value;
    await fetchTickets({ page: DEFAULT_PAGE });
  }

  async function setPage(nextPage: number) {
    await fetchTickets({ page: nextPage });
  }

  watch(
    () => route.query,
    async (query) => {
      if (
        isSyncingRoute.value ||
        isSameTicketsRouteQuery(query, getRouteState())
      ) {
        return;
      }

      applyRouteQuery(query);
      await fetchTickets({}, { syncRoute: false });
    },
  );

  async function retryFetch() {
    await fetchTickets();
  }

  function handleCreateTicket() {
    console.log("Create new ticket clicked");
  }

  function handleViewTicket(ticketId: number) {
    console.log("Ticket clicked:", ticketId);
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
    initFromRoute,
    fetchTickets,
    retryFetch,
    setSearch,
    setSelectedStatusId,
    setPage,
    handleCreateTicket,
    handleViewTicket,
  };
}
