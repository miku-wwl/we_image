import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

// for query purposes
const queryClient = postgres(
    "postgres://postgres:@127.0.0.1:5432/"
);
export const db = drizzle(queryClient, { schema, logger: true });
