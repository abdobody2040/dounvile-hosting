import { callWhmcs } from "./client";

type WhmcsProduct = { id?: string | number; name?: string; domain?: string; status?: string; billingcycle?: string; nextduedate?: string };
type ProductsResponse = { products?: { product?: WhmcsProduct[] } };

export async function getClientServices(clientId: number) {
  const response = await callWhmcs<ProductsResponse>("GetClientsProducts", { clientid: clientId, stats: false });
  return response.products?.product ?? [];
}
