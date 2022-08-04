const fs = require('fs');



function crearArchivo() {
    fs.appendFile('./files/fyh.txt', `${d}/${m}/${y}`, function (err) {
        if (err) throw err;
        console.log('Guardado!');
    })
}

function readFile() {
    fs.readFile('./files/fyh.txt', 'utf-8', (err, fileData) => {
        if (err) {
            console.log('Error', err)
        } else {
            console.log(fileData)
        }
    })
}

function newRead() {
    fs.promises.readFile('./files/fyh.txt', 'utf-8')
        .then((fileData) =>
            console.log(fileData))
        .catch((err) => console.log(err))
}

function escribir() {
    fs.promises.writeFile('./files/EscribiendoArchivo.txt', 'Mas Texto')
        .then((fileData) =>
            console.log('El archov se ha generado de forma correcta'))
        .catch((err) => console.log(err))
}

// fs.promises.readFile('./files/EscribiendoArchivo.txt', 'utf-8')
//     .then((fileData) =>
//         console.log(fileData))
//     .catch((err) => console.log(err))

async function leer() {
    try {
        await fs.promises.writeFile('./files/EscribiendoArchivo.txt', 'Mas Texto otra vez')
        const fileData = await fs.promises.readFile('./files/EscribiendoArchivo.txt', 'utf-8')
        console.log(fileData)
    } catch (error) {
        console.log(error);
    }
}
leer()
