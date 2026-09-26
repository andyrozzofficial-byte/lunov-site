import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import * as schema from "./schema";
import { seedDatabase } from "./seed";

const MIGRATIONS_DIR = path.join(
  /* turbopackIgnore: true */ process.cwd(),
  "drizzle",
);

declare global {
  // eslint-disable-next-line no-var
  var __lunovDb: ReturnType<typeof drizzle<typeof schema>> | undefined;
}

function resolveDbPath() {
  const configuredPath = process.env.COMMAND_CENTER_DB_PATH?.trim();
  if (configuredPath) {
    return {
      dbPath: configuredPath,
      dataDir: path.dirname(configuredPath),
    };
  }

  if (process.env.VERCEL) {
    return {
      dbPath: path.join("/tmp", "lunov-command-center.db"),
      dataDir: "/tmp",
    };
  }

  const dataDir = path.join(/* turbopackIgnore: true */ process.cwd(), "data");
  return {
    dbPath: path.join(dataDir, "lunov-command-center.db"),
    dataDir,
  };
}

function restoreDbFromBackup(dbPath: string) {
  const backupUrl = process.env.COMMAND_CENTER_DB_BACKUP_URL?.trim();
  if (!backupUrl || fs.existsSync(dbPath)) return;

  const result = spawnSync("curl", ["-fsSL", backupUrl, "-o", dbPath], {
    stdio: "ignore",
  });

  if (result.status !== 0 && fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
  }
}

function createDb() {
  const { dbPath, dataDir } = resolveDbPath();

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  restoreDbFromBackup(dbPath);

  const sqlite = new Database(dbPath);
  sqlite.pragma("journal_mode = WAL");
  sqlite.pragma("foreign_keys = ON");

  const db = drizzle(sqlite, { schema });

  if (fs.existsSync(MIGRATIONS_DIR)) {
    migrate(db, { migrationsFolder: MIGRATIONS_DIR });
  }

  seedDatabase(db);

  return db;
}

export function getDb() {
  if (process.env.NODE_ENV === "production") {
    return createDb();
  }

  if (!global.__lunovDb) {
    global.__lunovDb = createDb();
  }

  return global.__lunovDb;
}

export { schema };
