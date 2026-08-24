import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getAdminSummary, getLinkedAccountSummary } from "./whmcs/account";
import { searchDomainCatalog } from "./whmcs/catalog";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  catalog: router({
    domainSearch: publicProcedure.input(z.object({ label: z.string().max(100), tlds: z.array(z.string()).max(5).optional() })).query(({ input }) => searchDomainCatalog(input.label, input.tlds)),
  }),

  account: router({
    summary: protectedProcedure.query(() => getLinkedAccountSummary()),
  }),

  admin: router({
    summary: adminProcedure.query(() => getAdminSummary()),
  }),

  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;
