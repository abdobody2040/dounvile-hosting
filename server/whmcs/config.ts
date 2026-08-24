export type WhmcsConfig = {
  configured: boolean;
  endpoint?: string;
  identifier?: string;
  secret?: string;
  accessKey?: string;
};

type Env = Record<string, string | undefined>;

function cleanEndpoint(value?: string) {
  if (!value) return undefined;
  const endpoint = value.trim();
  if (!endpoint.startsWith("https://")) return undefined;
  return endpoint;
}

/** Reads only server environment variables; never return this object to browser procedures. */
export function getWhmcsConfig(env: Env = process.env): WhmcsConfig {
  const endpoint = cleanEndpoint(env.WHMCS_URL);
  const identifier = env.WHMCS_API_IDENTIFIER?.trim();
  const secret = env.WHMCS_API_SECRET?.trim();
  const accessKey = env.WHMCS_API_ACCESS_KEY?.trim();

  return {
    configured: Boolean(endpoint && identifier && secret),
    endpoint,
    identifier,
    secret,
    accessKey,
  };
}

/** Browser-safe connection state with no endpoint, identifiers, tokens, or secrets. */
export function getWhmcsPublicStatus(env: Env = process.env) {
  return { configured: getWhmcsConfig(env).configured } as const;
}
