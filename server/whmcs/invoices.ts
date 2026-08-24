import { callWhmcs } from "./client";

type WhmcsInvoice = { id?: string | number; status?: string; total?: string; duedate?: string; date?: string };
type InvoicesResponse = { invoices?: { invoice?: WhmcsInvoice[] } };

export async function getClientInvoices(clientId: number) {
  const response = await callWhmcs<InvoicesResponse>("GetInvoices", { userid: clientId, limitstart: 0, limitnum: 100 });
  return response.invoices?.invoice ?? [];
}
