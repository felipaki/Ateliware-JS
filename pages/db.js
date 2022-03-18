async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
 
    const mysql         = require("mysql2/promise");
    const connection    = await mysql.createConnection("mysql://root:netunos@2022@localhost:3306/ateliware");
    global.connection   = connection;
    return connection;
}

async function insertSearch(search){
    const conn      = await connect();
    const sql       = 'INSERT INTO search (id, name) VALUES (?,?);';
    const values    = [search.id, search.name];
    return await conn.query(sql, values);
}