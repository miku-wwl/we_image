<template>
    <div>
        <!-- <VueUploadButton :onFileUploaded="onFileUploaded" :uploader="uploader">
            asdasd
        </VueUploadButton> -->
        <VueDropzone
            :onFileUploaded="onFileUploaded"
            :onDraggingChanged="onDraggingChanged"
            :uploader="uploader"
            :style="{ width: 200, height: 200, background: 'red' }"
        >
            <!-- <div
                style="width: 200px; height: 200px; background-color: red"
            ></div -->
        </VueDropzone>
        <img :src="uploaded" />
    </div>
</template>

<script setup>
import "preact/debug";
import { createApiClient } from "@image-sass/api";
import { onMounted, ref, watchEffect } from "vue";
// import { UploadButtonWithUploader } from "@image-saas/upload-button";
import { connect } from "@image-saas/preact-vue-connect";
import { createUploader } from "@image-saas/uploader";
import { DropzoneWithUploader, Dropzone } from "@image-saas/dropzone";

// const VueUploadButton = connect(UploadButtonWithUploader);
const VueDropzone = connect(Dropzone);

const uploader = createUploader(async (file) => {
    const tokenResp = await fetch("/api/test");
    const token = await tokenResp.text();

    const apiClient = createApiClient({ signedToken: token });
    return apiClient.file.createPresignedUrl.mutate({
        filename: file.data instanceof File ? file.data.name : "test",
        contentType: file.data.type || "",
        size: file.size,
    });
});

const uploaded = ref("");

function onFileUploaded(url) {
    uploaded.value = url;
}

const dragging = ref(false);

watchEffect(() => {
    console.log(dragging.value);
});

function onDraggingChanged(flag) {
    dragging.value = flag;
}
</script>