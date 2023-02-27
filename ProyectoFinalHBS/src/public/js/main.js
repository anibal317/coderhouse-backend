const socket = io();


const form = document.getElementById("realTimeProducts")
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("formTitle").value
    const description = document.getElementById("formDescription").value
    const price = document.getElementById("formPrice").value
    const thumbnail = document.getElementById("formThumbnail").value
    const code = document.getElementById("formCode").value
    const stock = document.getElementById("formStock").value
    const category = document.getElementById("formCategory").value
    const product = { title, description, price, thumbnail, code, stock, category }
    socket.emit("addProduct", product)
})

socket.on("mensajeProductoAgregado", mensaje => {
    console.log(mensaje)
})

socket.on("getProducts", products => {

    document.getElementById("productsCard").innerHTML = ""

    products.forEach(product => {
        document.getElementById("productsCard").innerHTML +=
            `
            <div class="content">
            <div class="card" style="width: 18rem;">
            <img src=${product.thumbnail||"https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"} class="card-img-top cardImg" alt="...">
            <div class="card-body">
              <h5 class="card-title">${product.title||"Sin título"}</h5>
              <p class="card-text">${product.description||"Sin descripción"}</p>
              <p class="card-text">$${product.price}</p>
              <p class="card-text">Stock: ${product.stock}</p>
              <a id="botonProducto${product.id}" class="btn btn-primary">Eliminar</a>
            </div>
          </div>
        `
    });


    products.forEach(product => {
        document.getElementById(`botonProducto${product.id}`).addEventListener("click", (e) => {
            socket.emit("deleteProduct", product.id)
            socket.on("mensajeProductoEliminado", mensaje => {
                console.log(mensaje)
            })
        })
    })
})