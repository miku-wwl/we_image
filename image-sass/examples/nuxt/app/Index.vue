<template>
    <div>Hello World</div>
</template>

<script setup>
import { createApiClient } from "@image-sass/api";
import { onMounted } from "vue";

const apiClient = createApiClient({ apiKey: "asd" });

onMounted(() => {
    apiClient.file.createPresignedUrl.mutate({
        filename: "Screenshot 2023-06-20 200151.png",
        contentType: "image/png",
        size: 18105,
        appId: "61f2ef8d-1126-4e78-9020-cfd23b50c59b",
    });
});
</script>
