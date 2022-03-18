const db = require("../db");

export default function handler(body, res) {
  //const result = await db.insertSearch({id: body.id, name: body.name});
  res.json({ data: `Gravado` })
}