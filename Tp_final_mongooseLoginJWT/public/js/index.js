let sessionStatus = JSON.parse(localStorage.getItem("logged"))

const altaProveedores = document.getElementById("altaProveedores")
const login = document.getElementById("login")
const logout = document.getElementById("logout")
const frmAddProduct = document.getElementById("frmAddProduct")
const userInfo = document.getElementById("userInfo")
const misCompras=document.getElementById("miscompras")






if (sessionStatus === null) {
    // alert("usuario Invitado")
    altaProveedores.classList.toggle('hidden')
} else if (sessionStatus.userRol === "user") {
    login.classList.toggle('hidden')
    logout.classList.toggle('hidden')
    userInfo.classList.toggle('hidden')
    misCompras.classList.toggle('hidden')
    userInfo.innerHTML=`<strong>Bienvenido ${sessionStatus.userRol=="user"?"usuario":''}: ${sessionStatus.userLastname}, ${sessionStatus.userName} </strong>`
} else {
    altaProveedores.classList.toggle('hidden')
    alert("Bienvenido Admin")
    login.classList.toggle('hidden')
    logout.classList.toggle('hidden')
    userInfo.classList.toggle('hidden')
    misCompras.classList.toggle('hidden')
    frmAddProduct.classList.toggle('hidden')

}

logout.addEventListener('click', logOut)


function logOut() {
    localStorage.removeItem('logged')
}

