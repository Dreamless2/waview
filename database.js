import { Pool } from "pg";

export const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        ca: process.env.DATABASE_CA.replace(/\\n/g, "\n"),
        rejectUnauthorized: true
    }
});

db.on("error", (err) => {
    console.error("[PostgreSQL]", err);
});