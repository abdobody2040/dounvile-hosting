import { callWhmcs } from "./client";

type WhmcsDomain = { id?: string | number; domainname?: string; status?: string; nextduedate?: string; expirydate?: string };
type DomainsResponse = { domains?: { domain?: WhmcsDomain[] } };

export async function getClientDomains(clientId: number) {
  const response = await callWhmcs<DomainsResponse>("GetClientsDomains", { clientid: clientId, limitstart: 0, limitnum: 100 });
  return response.domains?.domain ?? [];
}
