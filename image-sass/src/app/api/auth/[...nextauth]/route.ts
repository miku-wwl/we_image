import NextAuth from "next-auth";
import GitlabProvider from "next-auth/providers/gitlab";
export const authOptions = {
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
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
