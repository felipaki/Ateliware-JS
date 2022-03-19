async function connect() {
    if (global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'ateliware',
        password: 'netunos@2022'
    });
    global.connection = connection;
    return connection;
}

export async function insertSearch(search) {
    console.log(search);
    const conn = await connect();
    console.log(conn);
    const sql = 'INSERT INTO search (id, name) VALUES (?,?);';
    const values = [search.id, search.name];
    return await conn.query(sql, values);
}