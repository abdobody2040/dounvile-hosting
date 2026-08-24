import { callWhmcs, WhmcsConfigurationError } from "./client";
import { getWhmcsConfig, type WhmcsConfig } from "./config";
import { domainToASCII } from "node:url";

export type DomainAvailability = "available" | "taken" | "unknown";
export type DomainSearchItem = {
  domain: string;
  extension: string;
  availability: DomainAvailability;
  price: number | null;
};

const allowedTlds = [".com", ".net", ".org", ".io", ".me"];

function normalizeLabel(label: string) {
  const raw = label.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\.[a-z0-9-]+$/i, "").replace(/\s/g, "");
  const asciiDomain = domainToASCII(`${raw}.com`);
  return asciiDomain.replace(/\.com$/i, "").replace(/[^a-z0-9-]/g, "").slice(0, 63);
}

type DomainWhoisResponse = { status?: string; domain?: string };

/** Looks up availability only through the server and returns no credentials or billing internals. */
export async function searchDomainCatalog(label: string, requestedTlds?: string[], config: WhmcsConfig = getWhmcsConfig()) {
  const normalized = normalizeLabel(label);
  if (!normalized) return { configured: config.configured, query: "", results: [] as DomainSearchItem[] };
  const tlds = (requestedTlds?.filter((tld) => allowedTlds.includes(tld)) ?? allowedTlds).slice(0, 5);
  const configured = config.configured;

  if (!configured) {
    return {
      configured: false,
      query: normalized,
      results: tlds.map((extension) => ({ domain: `${normalized}${extension}`, extension, availability: "unknown" as const, price: null })),
    };
  }

  const results = await Promise.all(tlds.map(async (extension) => {
    try {
      const response = await callWhmcs<DomainWhoisResponse>("DomainWhois", { domain: `${normalized}${extension}` });
      const status = response.status?.toLowerCase();
      return {
        domain: `${normalized}${extension}`,
        extension,
        availability: status === "available" ? "available" as const : status ? "taken" as const : "unknown" as const,
        price: null,
      };
    } catch (error) {
      if (error instanceof WhmcsConfigurationError) throw error;
      return { domain: `${normalized}${extension}`, extension, availability: "unknown" as const, price: null };
    }
  }));
  return { configured: true, query: normalized, results };
}
