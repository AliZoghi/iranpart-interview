import type { PaginatedResponse } from "~/core/api/pagination";
import { getTicketStatusLabel } from "../constants/ticket-status";
import { ticketsApi } from "../api/tickets.api";
import type { TicketDto } from "../types/ticket.dto";
import type { TicketModel } from "../types/ticket.model";
import type { TicketsQueryParams } from "../types/ticket.query";

class TicketsService {
  // region Service Methods
  public async getUserTickets(
    params?: TicketsQueryParams,
  ): Promise<PaginatedResponse<TicketModel>> {
    const response = await ticketsApi.getUserTickets(params);

    return this._convertToPaginatedTickets(response);
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
      statusLabel: getTicketStatusLabel(dto.fkStatusId),
      orderId: dto.fkOrderId,
      priorityId: dto.fkPriorityId,
      createdAt: new Date(dto.createDateTime),
      createdAtFa: dto.persianCreateDate,
      modifiedAtFa: dto.persianModifiedDateTime,
      isActive: dto.isActive,
    };
  }

  private _convertToPaginatedTickets(
    response: PaginatedResponse<TicketDto>,
  ): PaginatedResponse<TicketModel> {
    return {
      ...response,
      items: response.items.map((ticket) =>
        this._convertTicketDtoToTicketModel(ticket),
      ),
    };
  }
  //   endregion
}

export const ticketsService = new TicketsService();
