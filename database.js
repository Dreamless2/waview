import { Pool } from "pg";

export const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_CA ? {
        rejectUnauthorized: false,
        ca: process.env.DATABASE_CA,
    } : {
        rejectUnauthorized: false
    }
});

db.on("error", (err) => {
    console.error("[PostgreSQL]", err);
});