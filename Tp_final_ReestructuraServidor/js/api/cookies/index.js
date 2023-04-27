const app = require("express");
const router = app.Router();


router.post("/setCookie", async (req, res) => {
    console.log("Creando una cookie")
    const data = req.body
    console.log(data)
    res.cookie('CookieCookie', JSON.stringify(data), { maxAge: 30000, signed:true }).send('Cookie')

});
router.get("/getCookie", async (req, res) => {
    console.log("Consultando una cookie")
    res.send(req.signedCookies)

});


module.exports = router;
