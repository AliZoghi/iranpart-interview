export interface TicketDto {
  id: number;
  title: string;
  description: string;

  fkDepartmentId: number;
  departmentTitle: string;

  fkStatusId: number;
  statusTitle: string;

  fkOrderId: number | null;
  fkPriorityId: number;

  fkRegisterPersonId: number;

  messages: unknown[];

  isActive: boolean;
  isTrashed: boolean;

  createDateTime: string;
  persianCreateDate: string;

  modifiedDateTime: string;
  persianModifiedDateTime: string;
}
