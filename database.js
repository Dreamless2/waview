import fs from "fs";
import { Pool } from "pg";

export const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync("/ca.pem", "utf8"),
    },
});