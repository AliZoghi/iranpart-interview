export interface TicketModel {
  id: number;
  title: string;
  description: string;

  departmentId: number;
  departmentTitle: string;

  statusId: number;
  statusLabel: string;

  orderId: number | null;
  priorityId: number;

  createdAt: Date;
  createdAtFa: string;
  modifiedAtFa: string;

  isActive: boolean;
}
