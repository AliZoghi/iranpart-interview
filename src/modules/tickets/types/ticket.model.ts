export interface TicketModel {
  id: number
  title: string
  description: string

  departmentId: number
  departmentTitle: string

  statusId: number
  statusTitle: string

  orderId: number | null
  priorityId: number

  createdAt: Date
  createdAtFa: string

  isActive: boolean
}
