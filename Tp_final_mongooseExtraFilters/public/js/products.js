import { getAllProducts, cart } from '../js/utils/urlsApi.js'
import { productContainer, btnBuyProduct } from '../js/productsDomElements.js'



fetch(getAllProducts)
    .then(res => res.json())
    .then(data => {
        productContainer.innerHTML = ""
        data.products.docs.forEach(product => {
            productContainer.innerHTML += renderListProduct(product)
        })
        for (let i = 0; i < btnBuyProduct.length; i++) {
            btnBuyProduct[i].addEventListener('click', comprar)
        }
    })

function renderListProduct(lstProducts) {
    let htmlTemplate = `
                <div class="card" style="width: 18rem;">
                    <div class="d-flex justify-content-center">
                        <img src=${lstProducts.thumbnail.includes('https://') ? lstProducts.thumbnail : '../imgs/' + lstProducts.thumbnail}
                    class="card-img-top lstProducts d-flex justify-content-center" alt="..."'>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title" id="${lstProducts._id}" name="${lstProducts.name}">${lstProducts.name}</h5>
                        <hr>
                        <!--<p class="card-text" id="code${lstProducts._id}" code="${lstProducts.code}">Code: ${lstProducts.code}</p>-->
                        <h6 class="card-text" id="description${lstProducts._id}"> ${lstProducts.description}</h6>
                        <p class="card-text">Price: $${lstProducts.price}</p>
                        <p class="card-text">Disponibilidad: ${lstProducts.stock} unidad/es</p>
                        <p class="card-text" id="stock${lstProducts._id}" stock="${lstProducts.stock}"></Stock: ${lstProducts.stock} unidad/es</p>
                        <hr>
                        <div class="text-center btn-container">
                            <label class="" for="quantity">Quantity</label>
                            <input type="number" class="" name="quantity" id="qty${lstProducts._id}" min=0 max=${lstProducts.stock}>
                            <button class="btn btn-primary text-center mt-2 btnBuyProduct" data-description=${lstProducts.name} data-id=${lstProducts._id} data-price=${lstProducts.price} id="btnBuyProduct">
                                <img src="../imgs/cart.svg" class="svgCart"/>
                                Agregar al carrito
                            </button>
                        </div>
                        <hr>
                    </div>
                 </div>
    `
    return htmlTemplate
}


async function comprar(e) {
    e.preventDefault()
    const qty = parseInt(document.getElementById(`qty${e.target.dataset.id}`).value)
    const maxStock = parseInt(document.getElementById(`stock${e.target.dataset.id}`).getAttribute('stock'))
    if (qty < maxStock || qty === 0) {
        const prodId = e.target.dataset.id
        const price = e.target.dataset.price

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");


        let raw = JSON.stringify({
            price: parseFloat(price),
            prod_id: prodId,
            qtyBought: parseInt(qty),
            subTotal: parseInt(qty) * parseFloat(e.target.dataset.price).toFixed(2)
        })
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        document.getElementById(`qty${e.target.dataset.id}`).value = 0

        fetch(cart, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result, "Resultd del post")
                fetch(getAllProducts,
                    {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw.qtyBought,
                        redirect: 'follow'
                    }
                )
            })
            .catch(error => console.log('error', error));


    } else {
        swal({ text: "Error en cantidad", icon: "error" })
    }
}