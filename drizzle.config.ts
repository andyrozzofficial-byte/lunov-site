import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/command-center/db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: "./data/lunov-command-center.db",
  },
});
