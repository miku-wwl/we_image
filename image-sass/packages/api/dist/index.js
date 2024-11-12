import { httpBatchLink, createTRPCClient } from "@trpc/client";
export const apiClient = createTRPCClient({
    links: [
        httpBatchLink({
            url: "http://localhost:3000/api/trpc",
        }),
    ],
});
