import knexLib from "knex";

//Creamos el cliente
class ClienteSQL {
    constructor(config) {
        this.knex = knexLib(config);
    }

    createTable(tblName) {
        return this.knex.schema.dropTableIfExists(tblName).finally(() => {
            return this.knex.schema.createTable(tblName, table => {
                table.increments('id');
                table.string('title', 15).notNullable
                table.string('thumbnail', 255).notNullable
                table.float('price')
                table.integer('stock')
            })
        })
    }

    insertData(data) {
        return this.knex('articulos').insert(data)
    }

    selectData() {
        return this.knex('articulos').select('*').from('articulos').then(rows => rows)
    }

    selectDataById(id) {
        return this.knex('articulos').select('*').from('articulos').where('id', id).then(rows => {
            console.log(rows)
        })
    }

    deleteData(id) {
        return this.knex('articulos').where(id).del()
    }

    updateData(id, data) {
        return this.knex('articulos').where(id).update(data)
    }

    close() {
        this.knex.destroy();
    }
}

export default ClienteSQL