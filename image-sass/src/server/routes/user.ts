import { db } from "../db/db";
import { users } from "../db/schema";
import { protectedProcedure, router } from "../trpc";

export const userRouter = router({
    getPlan: protectedProcedure.query(async ({ ctx }) => {
        const result = await db.query.users.findFirst({
            where: (users, { eq, and }) => eq(users.id, ctx.session.user.id),
            columns: { plan: true },
        });

        return result?.plan;
    }),

    upgrade: protectedProcedure.mutation(async ({ ctx }) => {
        await db.update(users).set({
            plan: "payed",
        });
    }),
});