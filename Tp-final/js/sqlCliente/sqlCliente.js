const knexLib = require("knex");

// const options = {
//     client: 'sqlite3', // or 'better-sqlite3'
//     connection: {
//         filename: "./ecommerce.sqlite"
//     },
//     useNullAsDefault: true
// }
//     this.knex = knexLib(options);

//Creamos el cliente
const clienteSQL = class ClienteSQL {

    constructor(opt) {
        this.knex = knexLib(opt);
    }

    insertData(tblName, data) {
        return this.knex(tblName)
            .returning(['id', 'title'])
            .insert(data)
    }

    selectData(tblName) {
        return this.knex(tblName).select('*').from(tblName).then(rows => rows)
    }

    selectDataById(tblName,id) {
        return this.knex(tblName).select('*').from(tblName).where('id', id).then(rows => rows)
    }

    deleteData(tblName,id) {
        return this.knex(tblName).where({id}).del()
        //         knex('accounts')
        //   .where('activated', false)
        //   .del()
    }

    updateData(tblName, id, data) {
        return this.knex(tblName).where({id}).update(data)
    }

    close() {
        this.knex.destroy();
    }
}

module.exports = { clienteSQL }
// export default ClienteSQL