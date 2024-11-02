import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./src/server/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    host: "117.72.69.172",
    port: 5432,
    user: "postgres",
    password: "123123",
    database: "miku",
  },
  verbose: true,
  strict: true,
});
