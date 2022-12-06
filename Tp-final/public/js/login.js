const btnLogin = document.getElementById('btnLogin')
const password = document.getElementById('password')
const emailUser = document.getElementById('emailUser')


let requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

let loginState = false


async function getUsers() {
    await fetch("http://localhost:8080/api/user/", requestOptions)
        .then(response => response.json())
        .then(result => {
            let a = result.find(element => element.userName === emailUser.value && element.pwd === passwordUser.value)
            console.log(a)
            alert(`    ${loginState}    `)
        })
        .catch(error => console.log('error', error));
}



btnLogin.addEventListener('click', login)

async function login() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let myBody = JSON.stringify({
        "user": emailUser.value,
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
            console.log(result)
            if (result.status === 200){
                swal({ title: "Congrats!", text: `User was found `, icon: "success" })
                localStorage.setItem("logged", JSON.stringify(result.user))
            }else{
                swal({ title: "Sorry!", text: `User not found `, icon: "error" })
                
            }
        }
        )
        .catch(error => console.log(error))
}