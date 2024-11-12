import { createApiClient } from "@image-sass/api";
import jwt from "jsonwebtoken";

const apiKey = "1b5d3f99-10c3-45b5-be41-b506c8d34e06";
const clientId = "9ff39078-64d4-440d-b61c-8ee30d05d145";

export default defineEventHandler(async (event) => {
    // console.log(apiClient);

    const token = jwt.sign(
        {
            filename: "1.png",
            contentType: "image/png",
            size: 34105,
            appId: "61f2ef8d-1126-4e78-9020-cfd23b50c59b",
            clientId,
        },
        apiKey,
        {
            expiresIn: "100000m",
        }
    );

    return token;

    // const apiClient = createApiClient({ apiKey });

    // const response = await apiClient.file.createPresignedUrl.mutate({
    //     filename: "Screenshot 2023-06-20 200151.png",
    //     contentType: "image/png",
    //     size: 34105,
    //     appId: "c52963e1-dfa2-4e70-8333-04de2dcbbb4b",
    // });

    // return response;
});
