import fs from "fs"
import { Pool } from "pg"

export const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        ca: fs.readFileSync(process.env.POSTGRES_CA, "utf8"),
        rejectUnauthorized: true
    }
})