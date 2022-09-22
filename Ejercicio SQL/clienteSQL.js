import knexLib from "knex";

//Creamos el cliente
class ClienteSQL {
    constructor(config) {
        this.knex = knexLib(config);
    }

    createTable() {
        return this.knex.schema.dropTableIfExists('articulos').finally(() => {
            return this.knex.schema.createTable('articulos', table => {
                table.increments('id');
                table.string('nombre', 15).notNullable
                table.string('codigo', 10).notNullable
                table.float('precio')
                table.integer('stock')
            })
        })
    }

    insertData(data) {
        return this.knex('articulos').insert(data)
    }

    selectData() {
        return this.knex('articulos').select('*').from('articulos').then(rows => {
            console.log(rows)
        })
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