export function formatTicketDisplayId(id: number): string {
  return `#TK-${id}`;
}

export function resolveTicketDisplayDate(
  createdAtFa: string,
  modifiedAtFa: string,
): string {
  return createdAtFa || modifiedAtFa;
}
