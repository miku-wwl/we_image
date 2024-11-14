<template>
    <div>
        <VueUploadButton :onFileUploaded="onFileUploaded" :uploader="uploader">
            asdasd
        </VueUploadButton>
        <img :src="uploaded" />
    </div>
</template>

<script setup>
import { createApiClient } from "@image-sass/api";
import { onMounted, ref, watchEffect } from "vue";
import { UploadButtonWithUploader } from "@image-saas/upload-button";
import { connect } from "@image-saas/preact-vue-connect";
import { createUploader } from "@image-saas/uploader";

const VueUploadButton = connect(UploadButtonWithUploader);

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
</script>
