import { generateBigCodeNumber } from '../js/util.js'
import { getAllProducts } from '../js/utils/urlsApi.js'
import { productContainer } from '../js/productsDomElements.js'


fetch(getAllProducts)
    .then(res => res.json())
    .then(data => {
        productContainer.innerHTML = ""
        data.forEach(product => {
            productContainer.innerHTML += renderListProduct(product)
        })
    })

function renderListProduct(lstProducts) {
    let htmlTemplate = `
                <div class="card" style="width: 18rem;">
                    <div class="d-flex justify-content-center">
                    <img src="${lstProducts.thumbnail}"
                    class="card-img-top lstProducts d-flex justify-content-center" alt="...">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${lstProducts.name}</h5>
                        <hr>
                        <p class="card-text">Code: ${lstProducts.code}</p>
                        <p class="card-text">Price: $${lstProducts.price}</p>
                        <p class="card-text">Stock: ${lstProducts.stock} unidad/es</p>
                        <hr>
                        <div class="text-center">
                            <label class="" for="quantity">Quantity</label>
                            <input type="number" class="" name="quantity">
                            <button class="btn btn-primary text-center mt-2" data-id=${lstProducts.id} data-price=${lstProducts.price} id="btnBuyProduct">Comprar</button>
                        </div>
                        <hr>
                    </div>
                 </div>
    `
    return htmlTemplate
}
