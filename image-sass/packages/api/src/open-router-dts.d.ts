import * as postgres from 'postgres';
import * as _trpc_server_unstableInternalsExport from '@trpc/server/unstableInternalsExport';
import * as _trpc_server from '@trpc/server';

declare const openRouter: _trpc_server.CreateRouterInner<_trpc_server.RootConfig<{
    ctx: object;
    meta: object;
    errorShape: _trpc_server.DefaultErrorShape;
    transformer: _trpc_server.DefaultDataTransformer;
}>, {
    file: _trpc_server.CreateRouterInner<_trpc_server.RootConfig<{
        ctx: object;
        meta: object;
        errorShape: _trpc_server.DefaultErrorShape;
        transformer: _trpc_server.DefaultDataTransformer;
    }>, {
        createPresignedUrl: _trpc_server_unstableInternalsExport.MutationProcedure<{
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
        }>;
        saveFile: _trpc_server_unstableInternalsExport.MutationProcedure<{
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
        }>;
        listFiles: _trpc_server_unstableInternalsExport.QueryProcedure<{
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
        }>;
        infinityQueryFiles: _trpc_server_unstableInternalsExport.QueryProcedure<{
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
        }>;
        deleteFile: _trpc_server_unstableInternalsExport.MutationProcedure<{
            input: string;
            output: postgres.RowList<never[]>;
        }>;
    }>;
}>;
type OpenRouter = typeof openRouter;

export type { OpenRouter };
