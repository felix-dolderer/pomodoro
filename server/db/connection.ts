import { migrate } from "drizzle-orm/vercel-postgres/migrator";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { users } from "./schema";

export const db = drizzle(sql, { schema: { users } });

console.log("Migrating...");
await migrate(drizzle(sql), { migrationsFolder: "./drizzle" });
console.log("Migrated!");
