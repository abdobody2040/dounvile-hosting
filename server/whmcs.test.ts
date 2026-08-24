import { describe, expect, it } from "vitest";
import { getWhmcsConfig, getWhmcsPublicStatus } from "./whmcs/config";
import { searchDomainCatalog } from "./whmcs/catalog";

describe("WHMCS server configuration", () => {
  it("accepts HTTPS server credentials while exposing only a boolean status to the client", () => {
    const env = {
      WHMCS_URL: "https://billing.dounvile.test/includes/api.php",
      WHMCS_API_IDENTIFIER: "integration-id",
      WHMCS_API_SECRET: "private-server-secret",
    };
    const config = getWhmcsConfig(env);
    const status = getWhmcsPublicStatus(env);

    expect(config.configured).toBe(true);
    expect(config.secret).toBe("private-server-secret");
    expect(status).toEqual({ configured: true });
    expect(status).not.toHaveProperty("secret");
    expect(status).not.toHaveProperty("endpoint");
  });

  it("rejects non-HTTPS endpoints from being considered configured", () => {
    expect(getWhmcsConfig({ WHMCS_URL: "http://unsafe.example", WHMCS_API_IDENTIFIER: "id", WHMCS_API_SECRET: "secret" }).configured).toBe(false);
  });

  it("normalizes an Arabic domain label into an IDN-safe query without returning fake availability", async () => {
    const result = await searchDomainCatalog("مشروعي", [".com"], { configured: false });
    expect(result.results[0]?.domain).toMatch(/^xn--/);
    expect(result.results[0]?.availability).toBe("unknown");
  });
});
