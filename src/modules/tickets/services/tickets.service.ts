import type { PaginatedResponse } from '~/core/api/pagination'
import { ticketsApi } from '../api/tickets.api'
import type { TicketDto } from '../types/ticket.dto'
import type { TicketModel } from '../types/ticket.model'

class TicketsService {
  // region Service Methods
  public async getUserTickets(): Promise<PaginatedResponse<TicketModel>> {
    const response = await ticketsApi.getUserTickets()

    return this._convertToPaginatedTickets(response)
  }
  // endregion

  // region Helper methods
  private _convertTicketDtoToTicketModel(dto: TicketDto): TicketModel {
    return {
      id: dto.id,
      title: dto.title,
      description: dto.description,
      departmentId: dto.fkDepartmentId,
      departmentTitle: dto.departmentTitle,
      statusId: dto.fkStatusId,
      statusTitle: dto.statusTitle,
      orderId: dto.fkOrderId,
      priorityId: dto.fkPriorityId,
      createdAt: new Date(dto.createDateTime),
      createdAtFa: dto.persianCreateDate,
      isActive: dto.isActive
    }
  }

  private _convertToPaginatedTickets(response: PaginatedResponse<TicketDto>): PaginatedResponse<TicketModel> {
    return {
      ...response,
      items: response.items.map((ticket) => this._convertTicketDtoToTicketModel(ticket))
    }
  }
//   endregion
}

export const ticketsService = new TicketsService()
