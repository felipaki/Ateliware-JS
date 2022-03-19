const db = require("../db");

export default async function handler(body, res) {
    const result = await db.insertSearch({ id: body.query.id, name: body.query.name });
    res.json({ data: `Gravado` })
}