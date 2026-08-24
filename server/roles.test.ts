import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function contextFor(role: "user" | "admin"): TrpcContext {
  return {
    user: {
      id: role === "admin" ? 2 : 1,
      openId: `${role}-open-id`,
      name: role === "admin" ? "مسؤول" : "عميل",
      email: `${role}@dounvile.test`,
      loginMethod: "manus",
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("role-based administration", () => {
  it("blocks client accounts from internal administration summaries", async () => {
    const caller = appRouter.createCaller(contextFor("user"));
    await expect(caller.admin.summary()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("allows an administrator to receive a non-sensitive summary shape", async () => {
    const caller = appRouter.createCaller(contextFor("admin"));
    await expect(caller.admin.summary()).resolves.toMatchObject({ linked: false });
  });
});
