import { BaseApi } from '~/core/api/base-api'
import type { PaginatedResponse } from '~/core/api/pagination'
import type { TicketDto } from '../types/ticket.dto'

class TicketsApi extends BaseApi {
  constructor() {
    super('Ticket')
  }

  public getUserTickets(): Promise<PaginatedResponse<TicketDto>> {
    return this.get<PaginatedResponse<TicketDto>>('user-tickets')
  }
}

export const ticketsApi = new TicketsApi()
