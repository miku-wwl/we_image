import { db } from "../db/db";
import { apps } from "../db/schema";
import { createAppSchema } from "../db/validate-schema";
import { protectedProcedure, router } from "../trpc";
import { v4 as uuid } from "uuid";

export const appsRouter = router({
    createApp: protectedProcedure
        .input(createAppSchema)
        .mutation(async ({ ctx, input }) => {
            return db
                .insert(apps)
                .values({
                    id: uuid(),
                    name: input.name,
                    description: input.description,
                    userId: ctx.session.user.id,
                })
                .returning();
        }),
});
