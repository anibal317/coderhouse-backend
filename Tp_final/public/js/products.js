import { getAllProducts, cart } from '../js/utils/urlsApi.js'
import { productContainer, btnBuyProduct } from '../js/productsDomElements.js'


fetch(getAllProducts)
    .then(res => res.json())
    .then(data => {
        productContainer.innerHTML = ""
        data.products.forEach(product => {
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
                        <img src=${lstProducts.thumbnail.includes('https://')?lstProducts.thumbnail:'../imgs/'+lstProducts.thumbnail}
                    class="card-img-top lstProducts d-flex justify-content-center" alt="..."'>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title" id="name${lstProducts.id}" name="${lstProducts.title}">${lstProducts.title}</h5>
                        <hr>
                        <!--<p class="card-text" id="code${lstProducts.id}" code="${lstProducts.code}">Code: ${lstProducts.code}</p>-->
                        <p class="card-text">Price: $${lstProducts.price}</p>
                        <p class="card-text" id="stock${lstProducts.id}" stock="${lstProducts.stock}"></Stock: ${lstProducts.stock} unidad/es</p>
                        <hr>
                        <div class="text-center">
                            <label class="" for="quantity">Quantity</label>
                            <input type="number" class="" name="quantity" id="qty${lstProducts.id}">
                            <button class="btn btn-primary text-center mt-2 btnBuyProduct" data-description=${lstProducts.description} data-timestamp=${lstProducts.timeStamp} data-id=${lstProducts.id} data-price=${lstProducts.price} id="btnBuyProduct">Comprar</button>
                        </div>
                        <hr>
                    </div>
                 </div>
    `
    return htmlTemplate
}



async function comprar(e) {
    const qty = document.getElementById(`qty${e.target.dataset.id}`).value
    const name = document.getElementById(`name${e.target.dataset.id}`).getAttribute('name')
    const code = document.getElementById(`code${e.target.dataset.id}`).getAttribute('code')
    const imgUrl = document.getElementById(`imgUrl${e.target.dataset.id}`)
    const stock = document.getElementById(`stock${e.target.dataset.id}`).getAttribute('stock')

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    

    let raw = JSON.stringify({
        producto: {
            id: parseInt(e.target.dataset.id),
            timeStamp: e.target.dataset.timestamp,
            description: e.target.dataset.description,
            price: parseFloat(e.target.dataset.price),
            code,
            name,
            stock,
            img: imgUrl.src
        },
        qtyBought: parseInt(qty),
        timestamp: Date.now(),
        subTotal: parseInt(qty) * parseFloat(e.target.dataset.price)
    })

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(cart, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}