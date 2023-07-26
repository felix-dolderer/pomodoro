import type { Config } from "drizzle-kit";

export default {
  schema: "./server/db/schema.ts",
  driver: "pg",
  out: "./server/db/drizzle",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL + "?sslmode=require",
  },
} satisfies Config;
