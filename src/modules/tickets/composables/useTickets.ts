import type { PaginatedResponse } from '~/core/api/pagination'
import { ticketsService } from '../services/tickets.service'
import type { TicketModel } from '../types/ticket.model'

type TicketsPagination = Omit<PaginatedResponse<TicketModel>, 'items'>

export function useTickets() {
  const tickets = ref<TicketModel[]>([])
  const pagination = ref<TicketsPagination | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchTickets() {
    loading.value = true
    error.value = null

    try {
      const response = await ticketsService.getUserTickets()

      tickets.value = response.items
      pagination.value = {
        page: response.page,
        perPage: response.perPage,
        total: response.total,
        totalPages: response.totalPages
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch tickets'
    } finally {
      loading.value = false
    }
  }

  return {
    tickets,
    pagination,
    loading,
    error,
    fetchTickets
  }
}
