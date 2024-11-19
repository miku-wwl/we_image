"use client";

import { Uppy } from "@uppy/core";
import AWSS3 from "@uppy/aws-s3";
import { ReactNode, useEffect, useState } from "react";
import { trpcClientReact, trpcPureClient } from "@/utils/api";
import { Button } from "@/components/ui/Button";
import { UploadButton } from "@/components/feature/UploadButton";
import { Dropzone } from "@/components/feature/Dropzone";
import { usePasteFile } from "@/hooks/usePasteFile";
import { UploadPreview } from "@/components/feature/UploadPreview";
import { FileList } from "@/components/feature/FileList";
import { FilesOrderByColumn } from "@/server/routes/file";
import { MoveUp, MoveDown, Settings } from "lucide-react";
import Link from "next/link";
import { UpgradeDialog } from "./Upgrade";

export default function AppPage({
    params: { id: appId },
}: {
    params: { id: string };
}) {
    const { data: apps, isPending } = trpcClientReact.apps.listApps.useQuery(
        void 0,
        {
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
        }
    );

    const currentApp = apps?.filter((app) => app.id === appId)[0];

    const [showUpgrade, setShowUpgrade] = useState(false);

    const [uppy] = useState(() => {
        const uppy = new Uppy();
        uppy.use(AWSS3, {
            shouldUseMultipart: false,
            async getUploadParameters(file) {
                try {
                    const result =
                        await trpcPureClient.file.createPresignedUrl.mutate({
                            filename:
                                file.data instanceof File
                                    ? file.data.name
                                    : "test",
                            contentType: file.data.type || "",
                            size: file.size,
                            appId: appId,
                        });
                    return result;
                } catch (err) {
                    setShowUpgrade(true);
                    // return null
                    throw err;
                }
            },
        });
        return uppy;
    });

    usePasteFile({
        onFilesPaste: (files) => {
            uppy.addFiles(
                files.map((file) => ({
                    data: file,
                }))
            );
        },
    });

    const [orderBy, setOrderBy] = useState<
        Exclude<FilesOrderByColumn, undefined>
    >({
        field: "createdAt",
        order: "desc",
    });

    let children: ReactNode;

    if (isPending) {
        children = <div>Loading...</div>;
    } else if (!currentApp) {
        children = (
            <div className="flex flex-col mt-10 p-4 border rounded-md max-w-48 mx-auto items-center">
                <p className="text-lg">App Not Exist</p>
                <p className="text-sm">Chose another one</p>
                <div className="flex flex-col gap-4 items-center">
                    {apps?.map((app) => (
                        <Button key={app.id} asChild variant="link">
                            <Link href={`/dashboard/apps/${app.id}`}>
                                {app.name}
                            </Link>
                        </Button>
                    ))}
                </div>
            </div>
        );
    } else {
        children = (
            <div className="mx-auto h-full">
                <div className="container flex justify-between items-center h-[60px]">
                    <Button
                        onClick={() => {
                            setOrderBy((current) => ({
                                ...current,
                                order:
                                    current?.order === "asc" ? "desc" : "asc",
                            }));
                        }}
                    >
                        Created At{" "}
                        {orderBy.order === "desc" ? <MoveUp /> : <MoveDown />}
                    </Button>
                    <div className="flex justify-center gap-2">
                        <UploadButton uppy={uppy}></UploadButton>
                        <Button asChild>
                            <Link href="./new">new app</Link>
                        </Button>
                        <Button asChild>
                            <Link
                                href={`/dashboard/apps/${appId}/setting/storage`}
                            >
                                <Settings></Settings>
                            </Link>
                        </Button>
                    </div>
                </div>

                <Dropzone uppy={uppy} className=" relative h-[calc(100%-60px)]">
                    {(draging) => {
                        return (
                            <>
                                {draging && (
                                    <div className=" absolute inset-0 bg-secondary/50 z-10 flex justify-center items-center text-3xl">
                                        Drop File Here to Upload
                                    </div>
                                )}
                                <FileList
                                    appId={appId}
                                    uppy={uppy}
                                    orderBy={orderBy}
                                ></FileList>
                            </>
                        );
                    }}
                </Dropzone>
                <UploadPreview uppy={uppy}></UploadPreview>
                <UpgradeDialog
                    open={showUpgrade}
                    onOpenChange={(f) => setShowUpgrade(f)}
                ></UpgradeDialog>
            </div>
        );
    }

    return children;
}
