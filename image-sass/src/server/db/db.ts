import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

// for query purposes
const queryClient = postgres(
    "postgres://postgres:32110219miku123@117.72.69.172:5432/miku"
);
export const db = drizzle(queryClient, { schema });
