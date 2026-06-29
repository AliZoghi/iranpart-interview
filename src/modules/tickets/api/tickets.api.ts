import { BaseApi } from "~/core/api/base-api";
import type {
  PaginatedResponse,
  PaginationParams,
} from "~/core/api/pagination";
import type { TicketDto } from "../types/ticket.dto";

class TicketsApi extends BaseApi {
  constructor() {
    super("Ticket");
  }

  public getUserTickets(
    params?: PaginationParams,
  ): Promise<PaginatedResponse<TicketDto>> {
    return this.get<PaginatedResponse<TicketDto>>("user-tickets", { params });
  }
}

export const ticketsApi = new TicketsApi();
