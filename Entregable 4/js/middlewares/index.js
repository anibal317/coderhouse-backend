function isNumber(req, res, next) {
    let productId = req.params.id
    if (Number(productId)) {
        next()
    } else {
        res.status(404).send({ message: "Debe ingresar un valor numérico", value:productId })
    }
}

function verificarCliente(req, res, next) {
}

function validarId(req, res, next) {

}

function validarActive(req, res, next) {

}

function validarOutstanding(req, res, next) {

}


module.exports = {
    isNumber
};
