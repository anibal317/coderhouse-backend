const knexLib = require("knex");

const options = {
    client: 'sqlite3', // or 'better-sqlite3'
    connection: {
        filename: "./messages.sqlite"
    },
    useNullAsDefault: true
}
//     this.knex = knexLib(options);

//Creamos el cliente
const clienteSQL = class ClienteSQL {

    constructor() {
        this.knex = knexLib(options);
    }

    // createTable() {
    //     return this.knex.schema.dropTableIfExists("internalMessages").finally(() => {
    //         return this.knex.schema.createTable("internalMessages", table => {
    //             table.increments('id');
    //             table.string('title', 15).notNullable();
    //             table.string('thumbnail', 255).notNullable();
    //             table.float('price');
    //             table.integer('stock');
    //         })
    //     })
    // }

    insertData(data) {
        return this.knex('internalMessages')
            // .returning(['id', 'title'])
            .insert(data)
    }

    selectData() {
        return this.knex('internalMessages').select('*').from('internalMessages').then(rows => rows)
    }

    selectDataById(id) {
        return this.knex('internalMessages').select('*').from('internalMessages').where('id', id).then(rows => rows)
    }

    deleteData(id) {
        // console.log("en la api",id)
        return this.knex('internalMessages').where({id}).del()
        //         knex('accounts')
        //   .where('activated', false)
        //   .del()
    }

    updateData(id, data) {
        return this.knex('internalMessages').where({id}).update(data)
    }

    close() {
        this.knex.destroy();
    }
}

module.exports = { clienteSQL }
// export default ClienteSQL