import { Pool } from "pg";

const config = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false   // ← This is the key for self-signed certs
    }
};

// Optional: Only use CA if you have a proper one
if (process.env.DATABASE_CA) {
    try {
        const ca = process.env.DATABASE_CA.replace(/\\n/g, '\n');
        config.ssl.ca = ca;
        config.ssl.rejectUnauthorized = true;
        console.log('[DB] Using provided CA certificate');
    } catch (e) {
        console.warn('[DB] Failed to parse DATABASE_CA, falling back to rejectUnauthorized: false');
    }
}

export const db = new Pool(config);

db.on("error", (err) => {
    console.error("[PostgreSQL] Unexpected error:", err.message);
});

db.on("connect", () => {
    console.log("[PostgreSQL] Client connected successfully");
});