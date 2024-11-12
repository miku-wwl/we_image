<template>
    <div>Hello World</div>
</template>

<script setup>
import { createApiClient } from "@image-sass/api";
import { onMounted } from "vue";

onMounted(async () => {
    const tokenResp = await fetch("/api/test");
    const token = await tokenResp.text();

    console.log(token)
    
    const apiClient = createApiClient({ signedToken: token });

    apiClient.file.createPresignedUrl.mutate({
        filename: "1.png",
        contentType: "image/png",
        size: 34105,
        appId: "61f2ef8d-1126-4e78-9020-cfd23b50c59b",
    });
});
</script>
