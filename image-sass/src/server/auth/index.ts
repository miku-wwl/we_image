import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
    AuthOptions,
    DefaultSession,
    DefaultUser,
    getServerSession as nextAuthGetServerSession,
} from "next-auth";
import GitlabProvider from "next-auth/providers/gitlab";
import { db } from "@/server/db/db";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
        } & DefaultSession["user"];
    }
}

export const authOptions: AuthOptions = {
    adapter: DrizzleAdapter(db),
    callbacks: {
        async session({ session, user }) {
            if (session.user && user) {
                session.user.id = user.id;
            }

            return session;
        },
    },
    // Configure one or more authentication providers
    providers: [
        GitlabProvider({
            clientId:
                "3c9cbe2ff038df588eb669fdf38f7add51d4001272abedcde4c271f0bf58afbd",
            clientSecret:
                "gloas-d8cb75569529506e260ade83b0c6ce5a1feb5d78b0646302a26563f9318acb42",
        }),
    ],
};

export function getServerSession() {
    return nextAuthGetServerSession(authOptions);
}
