import { appRouter } from "@/server/router";
import { TRPCError, createCallerFactory, initTRPC } from "@trpc/server";

export const serverCaller = createCallerFactory()(appRouter);
