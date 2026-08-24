import { callWhmcs } from "./client";

type WhmcsTicket = { id?: string | number; tid?: string; subject?: string; status?: string; lastreply?: string };
type TicketsResponse = { tickets?: { ticket?: WhmcsTicket[] } };

export async function getClientSupportTickets(clientId: number) {
  const response = await callWhmcs<TicketsResponse>("GetTickets", { clientid: clientId, limitstart: 0, limitnum: 100 });
  return response.tickets?.ticket ?? [];
}
