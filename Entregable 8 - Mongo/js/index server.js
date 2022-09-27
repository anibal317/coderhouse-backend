import ClienteSQL from "./clienteSQL.js";

const options = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'coder_house'
    }
}

const csql = new ClienteSQL(options)




//opciones de conexión

//realizar operaciones
//crud
//Create Table


const articulos = [
    {
        nombre: "Articulo 1",
        codigo: 'art1',
        precio: 125.52,
        stock: 100
    },
    {
        nombre: "Articulo 2",
        codigo: 'art2',
        precio: 250,
        stock: 50
    },
    {
        nombre: "Articulo 3",
        codigo: 'art3',
        precio: 123.98,
        stock: 5
    },
    {
        nombre: "Articulo 4",
        codigo: 'art4',
        precio: 50.23,
        stock: 20
    },
    {
        nombre: "Articulo 5",
        codigo: 'art5',
        precio: 1500,
        stock: 5000
    },
    {
        nombre: "Articulo 6",
        codigo: 'art6',
        precio: 1500,
        stock: 5000
    }
]

csql.createTable().then(() => {
    console.log("Tabla Creada")

    return csql.insertData(articulos)
})
.then(() => {
    console.log("Artpiculos insertados")
})
.then(() => {
    console.log("Listando por id")
    return csql.selectDataById(1)
})
.then(() => {
    console.log("Listando todo")
    return csql.selectData()
})
.then(() => {
    console.log("Eliminando por id")
    return csql.deleteData({id:5})
})
.then(() => {
    console.log("Editando por id")
    return csql.updateData({id:6},{codigo:'ART&'})
})

.catch(err => {
    console.log(`Error: ${err}`)
});