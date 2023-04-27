let sessionStatus = JSON.parse(localStorage.getItem("logged"))

const altaProveedores = document.getElementById("altaProveedores")
const login = document.getElementById("login")
const logout = document.getElementById("logout")
const frmAddProduct = document.getElementById("frmAddProduct")
const cardAltaProveedores = document.getElementById("altaCardProveedores")
const userInfo = document.getElementById("userInfo")
const misCompras = document.getElementById("misCompras")
console.log(sessionStatus)





if (sessionStatus === null) {
    userInfo.classList.toggle('hidden')
    altaProveedores.classList.toggle('hidden')
    cardAltaProveedores.classList.toggle('hidden')
} else {
    if (sessionStatus.userRol === "user") {
        altaProveedores.classList.toggle('hidden')
        login.classList.toggle('hidden')
        logout.classList.toggle('hidden')
        userInfo.classList.toggle('hidden')
        misCompras.classList.toggle('hidden')
        userInfo.innerHTML = `<strong>Bienvenido ${sessionStatus.userRol == "user" ? "usuario" : ''}: ${sessionStatus.userLastname}, ${sessionStatus.userName} </strong>`
        cardAltaProveedores.classList.toggle('hidden')
    } else {
        altaProveedores.classList.toggle('hidden')
        userInfo.innerHTML = `<strong>Bienvenido ${sessionStatus.userRol == "Admin" ? "admin" : ''}: ${sessionStatus.userLastname}, ${sessionStatus.userName} </strong>`
        login.classList.toggle('hidden')
        logout.classList.toggle('hidden')
        userInfo.classList.toggle('hidden')
        misCompras.classList.toggle('hidden')
        cardAltaProveedores.classList.toggle('hidden')

        if (frmAddProduct) {
            frmAddProduct.classList.toggle('hidden')
        }

    }
}
logout.addEventListener('click', logOut)


function logOut() {
    console.log("Logout")
    localStorage.removeItem("logged")
    let requestOptions = {
        method: 'GET',
        headers: myHeaders
    };

    fetch("http://localhost:8080/api/user/logout", requestOptions)
        .then(response => response.json())
        .then(result => alert(result))
}