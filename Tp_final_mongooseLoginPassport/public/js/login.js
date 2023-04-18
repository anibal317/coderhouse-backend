const btnLogin = document.getElementById('btnLogin')
const password = document.getElementById('password')
const emailUser = document.getElementById('emailUser')


let requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

let loginState = false


btnLogin.addEventListener('click', login)

async function login() {
    if (emailUser.value === "" || password.value === '') {
        swal({ title: "Datos vacios!", text: `Debe ingresar los datos obligatorios`, icon: "error" })

    } else {
        const myHeaders = new Headers();
        swal({ title: "Datos Bien!", text: `Good`, icon: "success" })
        myHeaders.append("Content-Type", "application/json");

        let myBody = JSON.stringify({
            "userName": emailUser.value,
            "pwd": password.value
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: myBody
        };

        fetch("http://localhost:8080/api/user/login", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "Success") {
                    swal({ title: "Congrats!", text: `User was found `, icon: "success" })
                    localStorage.setItem("logged", JSON.stringify(result.userData))
                    window.location.href = "http://localhost:8080/";
                } else {
                    swal({ title: "Sorry!", text: `User not found `, icon: "error" })

                }
            }
            )
            .catch(error => console.log(error))


        fetch("http://localhost:8080/api/cookies/setCookie", requestOptions)
            .then(response => response.json())
            .thean(result => {
                console.log(result)
            })
            .catch(error => console.log(error))

    }
}