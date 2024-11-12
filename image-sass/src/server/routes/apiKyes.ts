import { desc } from "drizzle-orm";
import { db } from "../db/db";
import { apiKeys, apps, storageConfiguration } from "../db/schema";
import { createAppSchema } from "../db/validate-schema";
import { protectedProcedure, router } from "../trpc";
import { v4 as uuid } from "uuid";
import z from "zod";

export const apiKeysRouter = router({
    listapiKeys: protectedProcedure
        .input(z.object({ appId: z.string() }))
        .query(async ({ ctx, input }) => {
            return db.query.apiKeys.findMany({
                where: (apiKeys, { eq, and, isNull }) =>
                    and(
                        eq(apiKeys.appId, input.appId),
                        isNull(apiKeys.deletedAt)
                    ),
            });
        }),

    createApiKey: protectedProcedure
        .input(
            z.object({
                name: z.string().min(3).max(50),
                appId: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { name, ...configuration } = input;

            const result = await db
                .insert(apiKeys)
                .values({
                    name: input.name,
                    appId: input.appId,
                    key: uuid(),
                })
                .returning();

            return result[0];
        }),
});
