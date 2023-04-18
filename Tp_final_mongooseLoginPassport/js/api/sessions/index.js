const app = require("express");
const router = app.Router();


router.get("/", async (req, res) => {
    console.log("Consultando una session")
    if (req.session.counter) {
        req.session.counter++
        res.json(`Ingresaste ${req.session.counter} veces`)
    } else {
        req.session.counter = 1
        res.json("Saludos, inicio por primera vez")
    }

});


module.exports = router;
