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
        .catch (error => console.log('error', error));
}


btnLogin.addEventListener('click', () => {
    getUsers()})