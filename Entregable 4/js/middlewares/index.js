function isNumber(req, res, next) {
    let productId = req.params.id
    if (Number(productId)) {
        next()
    } else {
        res.status(404).send({ message: "Debe ingresar un valor numérico", value: productId })
    }
}

function isEmpty(req, res, next) {
    let data = req.body
    console.log(data)

    if (Object.entries(data).length === 0) {
        res.status(400).send({ message: "Sin datos en el body" })
    } else {
        next()
    }
}

function isBodyOk(req, res, next) {
    let {
        title, price, thumbnail
    } = req.body

    if (!thumbnail && !title || !price) {
            res.status(400).send({ message: "Error en el armado del body" })
    } else {
        next()
    }
}

function isPriceNumber(req, res, next) {
    let {price} = req.body
    if((!Number(price) || price <=0)){
        res.status(400).send({ message: "price no es un valor válido" })
    }else{
        next()
    }
}


module.exports = {
    isNumber,
    isEmpty,
    isBodyOk,
    isPriceNumber
};
