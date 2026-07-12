import { Pool } from "pg";

let sslConfig = {
    rejectUnauthorized: false
};

if (process.env.DATABASE_CA) {
    try {
        // Limpeza forte do certificado
        let ca = process.env.DATABASE_CA
            .replace(/\\n/g, '\n')           // Converte \n literais
            .replace(/^"|"$/g, '')           // Remove aspas no início e fim
            .replace(/\r/g, '')              // Remove \r se houver
            .trim();

        if (ca.includes("-----BEGIN CERTIFICATE-----")) {
            sslConfig.ca = ca;
            sslConfig.rejectUnauthorized = true;
            console.log('[DB] CA do Aiven carregado com sucesso');
        }
    } catch (e) {
        console.warn('[DB] Erro ao processar CA, usando modo inseguro');
    }
}

export const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: sslConfig
});

db.on("error", (err) => {
    console.error("[PostgreSQL] Erro:", err.message);
});

db.on("connect", () => {
    console.log("[PostgreSQL] ✅ Conectado ao Aiven!");
});