import { createApiClient } from "@image-sass/api";

const apiKey = "a3c57651-66ae-4129-93d1-41235ec4c84b";

export default defineEventHandler(async (event) => {
    // console.log(apiClient);

    const apiClient = createApiClient({ apiKey });

    const response = await apiClient.file.createPresignedUrl.mutate({
        filename: "Screenshot 2023-06-20 200151.png",
        contentType: "image/png",
        size: 18105,
        appId: "61f2ef8d-1126-4e78-9020-cfd23b50c59b",
    });

    return response;
});
