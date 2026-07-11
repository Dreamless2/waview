import fs from "fs"
import { Pool } from "pg"

export const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        ca: fs.readFileSync("/ca.pem", "utf8"),
        rejectUnauthorized: true
    }
})

db.on("error", (err) => {
    console.error("[PostgreSQL]", err)
})