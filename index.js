import {
    initAuthCreds,
    BufferJSON,
    proto
} from "baileys";

import { db } from "./database.js";

const SESSION = "default";

async function read(id) {
    const { rows } = await db.query(
        `SELECT data
           FROM whatsapp_auth
          WHERE session_name = $1
            AND id = $2`,
        [SESSION, id]
    );

    if (!rows.length)
        return null;

    return JSON.parse(
        JSON.stringify(rows[0].data),
        BufferJSON.reviver
    );
}

async function write(id, value) {
    await db.query(`
        INSERT INTO whatsapp_auth(session_name, id, data)
        VALUES($1, $2, $3)
        ON CONFLICT(session_name, id)
        DO UPDATE SET
            data = EXCLUDED.data,
            updated_at = NOW()
    `, [
        SESSION,
        id,
        JSON.stringify(value, BufferJSON.replacer)
    ]);
}

async function remove(id) {
    await db.query(
        `DELETE FROM whatsapp_auth
          WHERE session_name = $1
            AND id = $2`,
        [SESSION, id]
    );
}

export async function usePostgresAuthState() {
    const creds = (await read("creds")) || initAuthCreds();

    return {
        state: {
            creds,
            keys: {
                get: async (type, ids) => {
                    const data = {};

                    for (const id of ids) {
                        let value = await read(`${type}-${id}`);

                        if (
                            type === "app-state-sync-key" &&
                            value
                        ) {
                            value = proto.Message.AppStateSyncKeyData.fromObject(value);
                        }

                        data[id] = value;
                    }

                    return data;
                },

                set: async (data) => {
                    for (const category in data) {
                        for (const id in data[category]) {
                            const value = data[category][id];

                            if (value)
                                await write(`${category}-${id}`, value);
                            else
                                await remove(`${category}-${id}`);
                        }
                    }
                }
            }
        },

        saveCreds: async () => {
            await write("creds", creds);
        }
    };
}