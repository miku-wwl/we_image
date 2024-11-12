import { type OpenRouter } from "./open-router-dts";
export declare const apiClient: {
    file: {
        createPresignedUrl: {
            mutate: import("@trpc/client").Resolver<import("@trpc/server").RootConfig<{
                ctx: object;
                meta: object;
                errorShape: import("@trpc/server").DefaultErrorShape;
                transformer: import("@trpc/server").DefaultDataTransformer;
            }>, import("@trpc/server/unstableInternalsExport").MutationProcedure<{
                input: {
                    contentType: string;
                    appId: string;
                    filename: string;
                    size: number;
                };
                output: {
                    url: string;
                    method: "PUT";
                };
            }>>;
        };
        saveFile: {
            mutate: import("@trpc/client").Resolver<import("@trpc/server").RootConfig<{
                ctx: object;
                meta: object;
                errorShape: import("@trpc/server").DefaultErrorShape;
                transformer: import("@trpc/server").DefaultDataTransformer;
            }>, import("@trpc/server/unstableInternalsExport").MutationProcedure<{
                input: {
                    name: string;
                    type: string;
                    path: string;
                    appId: string;
                };
                output: {
                    id: string;
                    name: string;
                    type: string;
                    createdAt: Date | null;
                    deletedAt: Date | null;
                    path: string;
                    url: string;
                    userId: string;
                    contentType: string;
                    appId: string;
                };
            }>>;
        };
        listFiles: {
            query: import("@trpc/client").Resolver<import("@trpc/server").RootConfig<{
                ctx: object;
                meta: object;
                errorShape: import("@trpc/server").DefaultErrorShape;
                transformer: import("@trpc/server").DefaultDataTransformer;
            }>, import("@trpc/server/unstableInternalsExport").QueryProcedure<{
                input: {
                    appId: string;
                };
                output: {
                    id: string;
                    name: string;
                    type: string;
                    createdAt: Date | null;
                    deletedAt: Date | null;
                    path: string;
                    url: string;
                    userId: string;
                    contentType: string;
                    appId: string;
                }[];
            }>>;
        };
        infinityQueryFiles: {
            query: import("@trpc/client").Resolver<import("@trpc/server").RootConfig<{
                ctx: object;
                meta: object;
                errorShape: import("@trpc/server").DefaultErrorShape;
                transformer: import("@trpc/server").DefaultDataTransformer;
            }>, import("@trpc/server/unstableInternalsExport").QueryProcedure<{
                input: {
                    appId: string;
                    cursor?: {
                        id: string;
                        createdAt: string;
                    } | undefined;
                    limit?: number | undefined;
                    orderBy?: {
                        field: "createdAt" | "deletedAt";
                        order: "desc" | "asc";
                    } | undefined;
                };
                output: {
                    items: {
                        id: string;
                        name: string;
                        type: string;
                        createdAt: Date | null;
                        deletedAt: Date | null;
                        path: string;
                        url: string;
                        userId: string;
                        contentType: string;
                        appId: string;
                    }[];
                    nextCursor: {
                        createdAt: Date;
                        id: string;
                    } | null;
                };
            }>>;
        };
        deleteFile: {
            mutate: import("@trpc/client").Resolver<import("@trpc/server").RootConfig<{
                ctx: object;
                meta: object;
                errorShape: import("@trpc/server").DefaultErrorShape;
                transformer: import("@trpc/server").DefaultDataTransformer;
            }>, import("@trpc/server/unstableInternalsExport").MutationProcedure<{
                input: string;
                output: import("postgres").RowList<never[]>;
            }>>;
        };
    };
};
export declare const createApiClient: ({ apiKey, signedToken, }: {
    apiKey?: string | undefined;
    signedToken?: string | undefined;
}) => {
    file: {
        createPresignedUrl: {
            mutate: import("@trpc/client").Resolver<import("@trpc/server").RootConfig<{
                ctx: object;
                meta: object;
                errorShape: import("@trpc/server").DefaultErrorShape;
                transformer: import("@trpc/server").DefaultDataTransformer;
            }>, import("@trpc/server/unstableInternalsExport").MutationProcedure<{
                input: {
                    contentType: string;
                    appId: string;
                    filename: string;
                    size: number;
                };
                output: {
                    url: string;
                    method: "PUT";
                };
            }>>;
        };
        saveFile: {
            mutate: import("@trpc/client").Resolver<import("@trpc/server").RootConfig<{
                ctx: object;
                meta: object;
                errorShape: import("@trpc/server").DefaultErrorShape;
                transformer: import("@trpc/server").DefaultDataTransformer;
            }>, import("@trpc/server/unstableInternalsExport").MutationProcedure<{
                input: {
                    name: string;
                    type: string;
                    path: string;
                    appId: string;
                };
                output: {
                    id: string;
                    name: string;
                    type: string;
                    createdAt: Date | null;
                    deletedAt: Date | null;
                    path: string;
                    url: string;
                    userId: string;
                    contentType: string;
                    appId: string;
                };
            }>>;
        };
        listFiles: {
            query: import("@trpc/client").Resolver<import("@trpc/server").RootConfig<{
                ctx: object;
                meta: object;
                errorShape: import("@trpc/server").DefaultErrorShape;
                transformer: import("@trpc/server").DefaultDataTransformer;
            }>, import("@trpc/server/unstableInternalsExport").QueryProcedure<{
                input: {
                    appId: string;
                };
                output: {
                    id: string;
                    name: string;
                    type: string;
                    createdAt: Date | null;
                    deletedAt: Date | null;
                    path: string;
                    url: string;
                    userId: string;
                    contentType: string;
                    appId: string;
                }[];
            }>>;
        };
        infinityQueryFiles: {
            query: import("@trpc/client").Resolver<import("@trpc/server").RootConfig<{
                ctx: object;
                meta: object;
                errorShape: import("@trpc/server").DefaultErrorShape;
                transformer: import("@trpc/server").DefaultDataTransformer;
            }>, import("@trpc/server/unstableInternalsExport").QueryProcedure<{
                input: {
                    appId: string;
                    cursor?: {
                        id: string;
                        createdAt: string;
                    } | undefined;
                    limit?: number | undefined;
                    orderBy?: {
                        field: "createdAt" | "deletedAt";
                        order: "desc" | "asc";
                    } | undefined;
                };
                output: {
                    items: {
                        id: string;
                        name: string;
                        type: string;
                        createdAt: Date | null;
                        deletedAt: Date | null;
                        path: string;
                        url: string;
                        userId: string;
                        contentType: string;
                        appId: string;
                    }[];
                    nextCursor: {
                        createdAt: Date;
                        id: string;
                    } | null;
                };
            }>>;
        };
        deleteFile: {
            mutate: import("@trpc/client").Resolver<import("@trpc/server").RootConfig<{
                ctx: object;
                meta: object;
                errorShape: import("@trpc/server").DefaultErrorShape;
                transformer: import("@trpc/server").DefaultDataTransformer;
            }>, import("@trpc/server/unstableInternalsExport").MutationProcedure<{
                input: string;
                output: import("postgres").RowList<never[]>;
            }>>;
        };
    };
};
export { OpenRouter };
