import { useUppyState } from "@/app/dashboard/useUppyState";
import { cn } from "@/lib/utils";
import { trpcClientReact, trpcPureClient, AppRouter } from "@/utils/api";
import Uppy, { UploadCallback, UploadSuccessCallback } from "@uppy/core";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LocalFileItem, RemoteFileItem } from "./FileItem";
import { inferRouterOutputs } from "@trpc/server";
import { Button } from "../ui/Button";
import { ScrollArea } from "../ui/ScrollArea";
import { type FilesOrderByColumn } from "@/server/routes/file";
import { CopyUrl, DeleteFile } from "./FileItemAction";

type FileResult = inferRouterOutputs<AppRouter>["file"]["listFiles"];

export function FileList({
    uppy,
    orderBy,
    appId,
}: {
    uppy: Uppy;
    orderBy: FilesOrderByColumn;
    appId: string;
}) {
    const queryKey = {
        limit: 10,
        orderBy,
        appId,
    };

    const {
        data: infinityQueryData,
        isPending,
        fetchNextPage,
    } = trpcClientReact.file.infinityQueryFiles.useInfiniteQuery(
        { ...queryKey },
        {
            getNextPageParam: (resp) => resp.nextCursor,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
        }
    );

    const filesList = infinityQueryData
        ? infinityQueryData.pages.reduce((result, page) => {
              return [...result, ...page.items];
          }, [] as FileResult)
        : [];

    const utils = trpcClientReact.useUtils();

    const [uploadingFileIDs, setUploadingFileIDs] = useState<string[]>([]);
    const uppyFiles = useUppyState(uppy, (s) => s.files);

    useEffect(() => {
        const handler: UploadSuccessCallback<{}> = (file, resp) => {
            if (file) {
                trpcPureClient.file.saveFile
                    .mutate({
                        name:
                            file.data instanceof File ? file.data.name : "test",
                        path: resp.uploadURL ?? "",
                        type: file.data.type,
                        appId,
                    })
                    .then((resp) => {
                        utils.file.infinityQueryFiles.setInfiniteData(
                            { ...queryKey },
                            (prev) => {
                                if (!prev) {
                                    return prev;
                                }
                                return {
                                    ...prev,
                                    pages: prev.pages.map((page, index) => {
                                        if (index === 0) {
                                            return {
                                                ...page,
                                                items: [resp, ...page.items],
                                            };
                                        }
                                        return page;
                                    }),
                                };
                            }
                        );
                    });
            }
        };

        const uploadProgressHandler: UploadCallback = (data) => {
            setUploadingFileIDs((currentFiles) => [
                ...currentFiles,
                ...data.fileIDs,
            ]);
        };

        const completeHandler = () => {
            setUploadingFileIDs([]);
        };

        uppy.on("upload", uploadProgressHandler);

        uppy.on("upload-success", handler);

        uppy.on("complete", completeHandler);

        return () => {
            uppy.off("upload-success", handler);
            uppy.off("upload", uploadProgressHandler);
            uppy.off("complete", completeHandler);
        };
    }, [uppy, utils]);

    // ----------------------> intersection

    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (bottomRef.current) {
            const observer = new IntersectionObserver(
                (e) => {
                    if (e[0].intersectionRatio > 0.1) {
                        fetchNextPage();
                    }
                },
                {
                    threshold: 0.1,
                }
            );

            observer.observe(bottomRef.current);
            const element = bottomRef.current;

            return () => {
                observer.unobserve(element);
                observer.disconnect();
            };
        }
    }, [fetchNextPage]);

    const handleFileDelete = (id: string) => {
        utils.file.infinityQueryFiles.setInfiniteData(
            { ...queryKey },
            (prev) => {
                if (!prev) {
                    return prev;
                }
                return {
                    ...prev,
                    pages: prev.pages.map((page, index) => {
                        if (index === 0) {
                            return {
                                ...page,
                                items: page.items.filter(
                                    (item) => item.id !== id
                                ),
                            };
                        }
                        return page;
                    }),
                };
            }
        );
    };

    return (
        <ScrollArea className="h-full @container">
            {isPending && <div className="text-center">Loading</div>}
            <div
                className={cn(
                    "grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4 gap-4 relative container"
                )}
            >
                {uploadingFileIDs.length > 0 &&
                    uploadingFileIDs.map((id) => {
                        const file = uppyFiles[id];

                        return (
                            <div
                                key={file.id}
                                className="h-56 flex justify-center items-center border border-red-500"
                            >
                                <LocalFileItem
                                    file={file.data as File}
                                ></LocalFileItem>
                            </div>
                        );
                    })}

                {filesList?.map((file) => {
                    return (
                        <div
                            key={file.id}
                            className="h-56 flex relative justify-center items-center border overflow-hidden"
                        >
                            <div className="inset-0 absolute bg-background/30 opacity-0 hover:opacity-100 transition-all justify-center items-center flex">
                                <CopyUrl url={file.url}></CopyUrl>
                                <DeleteFile
                                    fileId={file.id}
                                    onDeleteSuccess={handleFileDelete}
                                ></DeleteFile>
                            </div>
                            <RemoteFileItem
                                contentType={file.contentType}
                                url={file.url}
                                name={file.name}
                            ></RemoteFileItem>
                        </div>
                    );
                })}
            </div>
            <div
                className={cn(
                    " justify-center p-8 hidden",
                    filesList.length > 0 && "flex"
                )}
                ref={bottomRef}
            >
                <Button variant="ghost" onClick={() => fetchNextPage()}>
                    Load Next Page
                </Button>
            </div>
        </ScrollArea>
    );
}
