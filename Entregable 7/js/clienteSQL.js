const knexLib = require("knex");

const options = {
    client: 'sqlite3', // or 'better-sqlite3'
    connection: {
        filename: "./ecommerce.sqlite"
    }
}
//     this.knex = knexLib(options);

//Creamos el cliente
const clienteSQL = class ClienteSQL {

    constructor() {
        this.knex = knexLib(options);
    }

    createTable() {
        return this.knex.schema.dropTableIfExists("articulos").finally(() => {
            return this.knex.schema.createTable("articulos", table => {
                table.increments('id');
                table.string('title', 15).notNullable();
                table.string('thumbnail', 255).notNullable();
                table.float('price');
                table.integer('stock');
            })
        })
    }

    insertData(data) {
        // console.log(data, "datos")
        return this.knex('articulos').insert([{
            id: 2,
            title: "Escuadra",
            thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
            price: 123.45,
            stock:10
        },{
            id: 3,
            title: "Escuadra",
            thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
            price: 123.45,
            stock:10
        }
    ])
    }

    selectData() {
        return this.knex('articulos').select('*').from('articulos').then(rows=>rows)
    }

    selectDataById(id) {
        return this.knex('articulos').select('*').from('articulos').where('id', id).then(rows => rows)
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

module.exports = { clienteSQL }
// export default ClienteSQL