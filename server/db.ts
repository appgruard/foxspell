import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

// Connection string from user
const connectionString = "postgresql://neondb_owner:npg_OSJf71uPDGkg@ep-rough-scene-ah5xncls-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

export const pool = new Pool({ connectionString });
export const db = drizzle(pool, { schema });
