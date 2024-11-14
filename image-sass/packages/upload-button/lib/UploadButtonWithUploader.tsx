import {
    UploadCompleteCallback,
    UploadSuccessCallback,
    Uppy,
    UppyFile,
} from "@uppy/core";
import { UploadButton, UploadButtonProps } from ".";
import { useEffect, useRef } from "preact/hooks";

export function UploadButtonWithUploader({
    uploader,
    onFileUploaded,
    ...uploadButtonProps
}: {
    uploader: Uppy;
    onFileUploaded: (url: string, file: UppyFile) => {};
} & UploadButtonProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const successCallback: UploadSuccessCallback<{}> = (file, resp) => {
            onFileUploaded(resp.uploadURL!, file!);
        };
        const completeCallback: UploadCompleteCallback<{}> = () => {
            if (inputRef.current) {
                inputRef.current.value = "";
            }
        };

        uploader.on("upload-success", successCallback);
        uploader.on("complete", completeCallback);

        return () => {
            uploader.off("upload-success", successCallback);
            uploader.off("complete", completeCallback);
        };
    });

    function onFiles(files: File[]) {
        uploader.addFiles(
            files.map((file) => ({
                data: file,
            }))
        );

        uploader.upload();
    }

    return (
        <UploadButton
            {...uploadButtonProps}
            onFileChosed={onFiles}
            inputRef={inputRef}
        ></UploadButton>
    );
}
