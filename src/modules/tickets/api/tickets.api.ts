import { BaseApi } from "~/core/api/base-api";
import type { PaginatedResponse } from "~/core/api/pagination";
import type { TicketDto } from "../types/ticket.dto";
import type { TicketsQueryParams } from "../types/ticket.query";

interface UserTicketsApiParams {
  Page?: number;
  PerPage?: number;
  Search?: string;
  Status?: number;
}

class TicketsApi extends BaseApi {
  constructor() {
    super("Ticket");
  }

  public getUserTickets(
    params?: TicketsQueryParams,
  ): Promise<PaginatedResponse<TicketDto>> {
    return this.get<PaginatedResponse<TicketDto>>("user-tickets", {
      params: this._mapQueryParams(params),
    });
  }

  private _mapQueryParams(
    params?: TicketsQueryParams,
  ): UserTicketsApiParams | undefined {
    if (!params) {
      return undefined;
    }

    const apiParams: UserTicketsApiParams = {};

    if (params.page !== undefined) {
      apiParams.Page = params.page;
    }

    if (params.perPage !== undefined) {
      apiParams.PerPage = params.perPage;
    }

    if (params.search) {
      apiParams.Search = params.search;
    }

    if (params.statusId !== undefined) {
      apiParams.Status = params.statusId;
    }

    return Object.keys(apiParams).length > 0 ? apiParams : undefined;
  }
}

export const ticketsApi = new TicketsApi();
