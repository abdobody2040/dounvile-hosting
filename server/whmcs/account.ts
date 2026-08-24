import { getWhmcsPublicStatus } from "./config";

/**
 * Client-to-WHMCS identity linkage is deliberately not inferred from browser input.
 * Until an owner links the authenticated account server-side, no customer record is queried.
 */
export function getLinkedAccountSummary() {
  return {
    ...getWhmcsPublicStatus(),
    linked: false,
    services: [],
    domains: [],
    invoices: [],
    tickets: [],
  };
}

export function getAdminSummary() {
  return {
    ...getWhmcsPublicStatus(),
    linked: false,
    customers: null,
    activeServices: null,
    openOrders: null,
    openTickets: null,
  };
}

/**
 * This explicit identity-link hook is the only permitted point to call client-scoped WHMCS readers.
 * Persist an authenticated Dounvile user ↔ WHMCS client ID link server-side before calling it.
 */
export async function getLinkedWhmcsRecords(_whmcsClientId: number) {
  throw new Error("WHMCS client identity linking has not been configured for this account.");
}
