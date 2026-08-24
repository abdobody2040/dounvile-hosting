import { getWhmcsConfig } from "./config";

type Primitive = string | number | boolean | undefined;
type WhmcsResponse<T> = T & { result?: "success" | "error"; message?: string };

export class WhmcsConfigurationError extends Error {
  constructor() {
    super("WHMCS integration is not configured on the server.");
    this.name = "WhmcsConfigurationError";
  }
}

export class WhmcsRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WhmcsRequestError";
  }
}

/** Makes a server-only WHMCS API request. Credentials are added here and never leave the server. */
export async function callWhmcs<T extends Record<string, unknown>>(
  action: string,
  params: Record<string, Primitive> = {},
): Promise<T> {
  const config = getWhmcsConfig();
  if (!config.configured || !config.endpoint || !config.identifier || !config.secret) {
    throw new WhmcsConfigurationError();
  }

  const body = new URLSearchParams({
    action,
    identifier: config.identifier,
    secret: config.secret,
    responsetype: "json",
  });
  if (config.accessKey) body.set("accesskey", config.accessKey);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) body.set(key, String(value));
  });

  let response: Response;
  try {
    response = await fetch(config.endpoint, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    throw new WhmcsRequestError("تعذر الوصول إلى خدمة الفوترة. حاول مجددًا لاحقًا.");
  }
  if (!response.ok) {
    throw new WhmcsRequestError("تعذر الوصول إلى خدمة الفوترة. حاول مجددًا لاحقًا.");
  }

  const data = await response.json() as WhmcsResponse<T>;
  if (data.result === "error") {
    throw new WhmcsRequestError("تعذر إكمال الطلب لدى خدمة الفوترة.");
  }
  return data as T;
}
