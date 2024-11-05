import z from "zod";
import { protectedProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import {
    S3Client,
    PutObjectCommand,
    PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const bucket = "test-image-1300216527";
const apiEndpoint = "http://117.72.69.172:9000";
const region = "ap-nanjing-xxxxxxxxxxx";
const COS_APP_ID = "1wZk5qSlnC3asfIBJbng";
const COS_APP_SECRET = "BUXi60cz98DfKqvmdhVyCU7l90SmnLboQi18aWci";

export const fileRoutes = router({
    createPresignedUrl: protectedProcedure
        .input(
            z.object({
                filename: z.string(),
                contentType: z.string(),
                size: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const date = new Date();

            const isoString = date.toISOString();

            const dateString = isoString.split("T")[0];

            const params: PutObjectCommandInput = {
                Bucket: bucket,
                Key: `${dateString}/${input.filename.replaceAll(" ", "_")}`,
                ContentType: input.contentType,
                ContentLength: input.size,
            };

            const s3Client = new S3Client({
                endpoint: apiEndpoint,
                region: region,
                credentials: {
                    accessKeyId: COS_APP_ID,
                    secretAccessKey: COS_APP_SECRET,
                },
            });

            const command = new PutObjectCommand(params);
            const url = await getSignedUrl(s3Client, command, {
                expiresIn: 60,
            });

            return {
                url,
                method: "PUT" as const,
            };
        }),
});
